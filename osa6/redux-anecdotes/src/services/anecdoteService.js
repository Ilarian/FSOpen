import axios from 'axios'

const baseUrl = "http://localhost:3001/"

const getAll = async() => {
    const anecdotes = await axios.get(baseUrl+"anecdotes")
    return anecdotes.data
}

const createNew = async(anecdote) => {
    const object = {content: anecdote, votes: 0}
    const response = await axios.post(baseUrl+"anecdotes", object)
    console.log("new anec", response.data)
    return response.data
}

const vote = async(id) => {
    const url = baseUrl+"anecdotes/"+id
    const anecdote = await axios.get(url)
    const votedAnecdote = {...anecdote.data, votes: anecdote.data.votes + 1}
    const response = await axios.put(url, votedAnecdote)
    return response.data
}

export default {getAll, createNew, vote}