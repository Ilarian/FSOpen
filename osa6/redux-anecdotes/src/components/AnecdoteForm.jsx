import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateAnecdote = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const handleNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(addAnecdote(anecdote))
        dispatch(setNotification('You created a new anecdote'))
    }
    
    return (
    <>
        <h2>create new</h2>
        <form onSubmit={handleNew}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </>
    )
}

export default CreateAnecdote