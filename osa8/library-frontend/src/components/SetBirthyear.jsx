import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../../queries"

const SetBirthyear = ({authors}) => {

    const [selectedAuthor, setSelectedAuthor] = useState(authors[0].name)
    const [birthYear, SetBirthyear] = useState()
    
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}]
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        editAuthor({variables: {name: selectedAuthor, setBornTo: birthYear}})
    }


    return(
        <div>
            <h2>Edit authors birthyear</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <select onChange={(e) => setSelectedAuthor(e.target.value)}>
                    {authors.map(a => {
                        return <option key={a.name} value={a.name}>{a.name}</option>
                    })}
                </select>
                <label htmlFor="Born">Born:<input type="number" onChange={(e) => SetBirthyear(parseInt(e.target.value))}></input></label>
                <button type="submit">Change birthyear</button>
            </form>
        </div>
    )
}

export default SetBirthyear