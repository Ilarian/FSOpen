import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        if(!state.filter){
            return state.anecdotes
        }else{
            const filteredAnecdotes = state.anecdotes.filter(anecdote => {
                return anecdote.content.includes(state.filter) ? anecdote : null
            })
            return filteredAnecdotes
        }
    })
    const dispatch = useDispatch()
    
    const vote = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification('You voted for: ' + content))
    }

return (
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList