import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"

const AddComment = ({id}) => {

    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleAddComment = (e) => {
        e.preventDefault()
        dispatch(addComment(id, comment))
        setComment('')
    }

    return (
        <div>
            <form onSubmit={handleAddComment}>
                <input onChange={(e) => setComment(e.target.value)}></input>
                <button type="submit">add comment</button>
            </form>
        </div>
    )
}

export default AddComment