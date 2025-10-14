import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { NotificationReducer } from './NotificationContext'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'


const App = () => {

  const [notification, notificationDispatch] = useReducer(NotificationReducer, null)

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
      mutationFn: voteAnecdote,
      onSuccess: (votedAnecdote) => {
        queryClient.setQueryData(['anecdotes'], (old) => {
          console.log(old)
          return old.map((anecdote) => {
            if(anecdote.id === votedAnecdote.id){
              return votedAnecdote
            }else{
              return anecdote
            }
          })
        })
      }
    })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    notificationDispatch({type: 'MSG', payload: `You voted for ${anecdote.content}`})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <NotificationContext.Provider value={{notification, notificationDispatch}} >
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
    </NotificationContext.Provider>
  )
}



export default App
