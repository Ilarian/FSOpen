const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {randomUUID} = require('crypto')
const mongoose = require('mongoose')
const Book = require('./schemas/Book')
const Author = require('./schemas/Author')
const User = require('./schemas/User')
const { GraphQLError } = require('graphql')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCounts: Int!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
}

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: [String]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!): Book

    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
    editAuthor(name: String!, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
        let books
        if(args.author){
            const author = await Author.findOne({name: args.author})
            books = await Book.find({author: author.id}).populate('author')
        }
        if(args.genre){
          if(args.author){
            console.log(books)
            books = books.filter(b => args.genre.some(g => b.genres.includes(g)))
          }else{
            books = Book.find({genres: {$elemMatch: {$in: args.genre}}}).populate('author')
          }
        }
        if(!args.genre && !args.author){
          books = Book.find({}).populate('author')
        }
        return books
        
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCounts: async ({name}) => {
        const books = await Book.find({}).populate('author')
        return books.filter(book => book.author.name === name).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
        if(!context.currentUser){
          console.log("no currentuser")
          return null
        }
        const authors = await Author.find({})
        let author = authors.find(a => a.name === args.author)
        if(!author){
            author = new Author({name: args.author})
            try{
              await author.save()
            }catch(err){
              console.log(err)
              throw new GraphQLError("Author name too short, min 4 characters", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.author.name,
                  err
                }
              })
            }
            const book = new Book({ ...args, author: author.id, id: randomUUID()})
            try{
              await book.save()
            }catch(err){
              console.log(err)
              throw new GraphQLError("Book title too short, min 5 characters", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.title,
                  err
                }
              })
            }
            return book.populate('author')
        }else{
          const book = new Book({ ...args, author: author.id, id: randomUUID()})
          try{
            await book.save()
          }catch(err){
            console.log(err)
            throw new GraphQLError("Book title too short, min 5 characters", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.title,
                  err
                }
              })
          }
          return book.populate('author')
        }
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) return null
      const author = await Author.findOne({name: args.name})
      if (!author){
          return null
      }
      if (args.setBornTo){
          author.born = args.setBornTo
          return author.save()
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})