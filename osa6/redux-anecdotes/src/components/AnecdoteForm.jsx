import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'

const CreateAnecdote = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const handleNew = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(createAnecdote(anecdote))
        dispatch(setNotif('You created a new anecdote', 3))
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