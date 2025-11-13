import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      author
      published
    }
  }
  `

export const ALL_BOOKS = gql`
    query Query {
      allBooks {
        title
        published
        author
        id
        genres
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