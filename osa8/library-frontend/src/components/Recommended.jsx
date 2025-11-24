import { gql } from '@apollo/client'
import {useQuery} from '@apollo/client/react'
import { useEffect, useState } from 'react'

const Recommended = (props) => {

    const [recommended, setRecommended] = useState(null)

    const FAV_GENRE = gql`
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
    
    const result = useQuery(FAV_GENRE, {
        variables: {genre: props.user ? props.user.favoriteGenre : null}
    })

    useEffect(() => {
        if(!result.loading){
            setRecommended(result.data.allBooks)
        }
    })
    

    if (!props.show) {
        return null
    }

    if(result.loading){
        return <div>loading...</div>
    }

    return(
        <div>
            <table>
            <tbody>
            <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
            </tr>
            {recommended.map((a) => (
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}

export default Recommended