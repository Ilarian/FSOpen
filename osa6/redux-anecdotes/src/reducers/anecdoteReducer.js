import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'ANECDOTE',
  initialState,
  reducers: {
    vote(state, action){
      const newState = state.map(anecdote => {
        if(anecdote.id === action.payload.id){
          return action.payload
        }else{
          return anecdote
        }
      })
      return newState.sort((a,b) => {return b.votes - a.votes})
    },
    addAnecdote(state, action) {
        return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      console.log(action.payload)
      return action.payload.sort((a,b) => {return b.votes - a.votes})
    },
  }
})

export const {vote, addAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer