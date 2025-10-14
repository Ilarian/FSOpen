import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const {notificationDispatch} = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) => anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      notificationDispatch({type: 'MSG', payload: 'Anecdote too short, must be atleast 5 characters'})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({type: 'MSG', payload: 'You created a new anecdote!'})

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
