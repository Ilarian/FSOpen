import { gql } from '@apollo/client'
import {useQuery} from '@apollo/client/react'
import SetBirthyear from './SetBirthyear'

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCounts
      born
      id
      name
    }
  }
`

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const result = useQuery(ALL_AUTHORS)

  if(result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCounts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthyear authors={authors}/>
    </div>

    
  )
}

export default Authors
