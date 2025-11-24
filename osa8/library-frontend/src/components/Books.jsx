import { gql } from '@apollo/client'
import {useQuery} from '@apollo/client/react'
import { useEffect, useState } from 'react'


const Books = (props) => {

  const [allBooks, setAllBooks] = useState([])
  const [booksToShow, setBooksToShow] = useState([])

  const ALL_BOOKS = gql`
    query AllBooks {
      allBooks {
        genres
        id
        published
        title
        author {
          name
        }
      }
    }
  `

  const ONE_GENRE = gql`
  query Query($genre: [String]) {
    allBooks(genre: $genre) {
        author {
            name
        }
        published
        title
      }
  }
  `

  const result = useQuery(ALL_BOOKS)

  const oneGenre = useQuery(ONE_GENRE)

  useEffect(() => {
    if(!result.loading){
      setAllBooks(result.data.allBooks)
      setBooksToShow(result.data.allBooks)
    }
  }, [result])

  if(result.loading) return <div>loading...</div>
  
  if (!props.show) {
    return null
  }

  const uniqueGenres = () => {
    let uniqueGenres = []
    allBooks.map(book => {
      book.genres.forEach((genre) => {
        if(!uniqueGenres.includes(genre)){
          uniqueGenres.push(genre)
        }
      })
    })
    return uniqueGenres.concat("all")
  }

  const handleGenre = (genre) => {
    if(genre === 'all'){
      setBooksToShow(allBooks)
    }else{
      oneGenre.refetch({genre: genre}).then(res => setBooksToShow(res.data.allBooks))
    }
  }
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres().map((genre) => {
        return <button key={genre} onClick={() => handleGenre(genre)}>{genre}</button>
      })}
    </div>
  )
}

export default Books
