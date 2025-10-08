import { useSelector, useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'

const CreateAnecdote = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(addAnecdoteAction(anecdote))
    }
    
    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </>
    )
}

export default CreateAnecdote