import { useState } from 'react'

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = async (event) => {
    event.preventDefault()
    addBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitle = (event) => {
    const value = event.target.value
    setTitle(value)
  }

  const handleAuthor = (event) => {
    const value = event.target.value
    setAuthor(value)
  }

  const handleUrl = (event) => {
    const value = event.target.value
    setUrl(value)
  }

  return (
    <div>
      <h1>Create blog</h1>
      <form className="form" onSubmit={submitBlog}>
        <input placeholder="title" onChange={handleTitle} value={title}></input>
        <input placeholder="author" onChange={handleAuthor} value={author}></input>
        <input placeholder="url" onChange={handleUrl} value={url}></input>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog