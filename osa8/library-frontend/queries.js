import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    author {
      name
    }
  }
}
  `

export const ALL_BOOKS = gql`
    query Query {
      allBooks {
        author {
          name
        }
        genres
        published
        title
      }
    }
  `

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCounts
      born
      id
      name
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    born
    name
  }
}
`

export const USER_LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const ME = gql`
  query Query {
    me {
      favoriteGenre
      username
    }
  }
`