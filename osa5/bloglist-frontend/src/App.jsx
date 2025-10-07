import { useState, useEffect, useRef } from 'react'
import './style/main.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglabe'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs( blogs )
    }
    )
    if(window.localStorage.getItem('user') && !user){
      setUser(JSON.parse(window.localStorage.getItem('user')))
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const likeBlog = async (id, likes) => {
    const response = await blogService.likeBlog(id, likes)
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id){
        blog.likes = response.likes
      }
      return blog
    })
    setBlogs(updatedBlogs)
  }

  const removeBlog = async (id) => {
    try{
      const response = await blogService.removeBlog(id, user)
      if(response.status === 204){
        const updatedBlogs = blogs.filter(blog => {
          if(blog.id !== id){
            return blog
          }
        })
        setBlogs(updatedBlogs)
      }
    }catch(err){
      console.log('eh', err)
    }
  }

  const addBlog = async (newBlog) => {
    try{
      const req = await blogService.addBlog(newBlog)
      const addedBlog = {...req, user: user}
      setBlogs(blogs.concat(addedBlog))
      setNotification('Blog created successfully!')
      blogFormRef.current.toggleVisibility()
    }catch(err){
      console.log(err)
    }
  }

  if(user){
    return (
      <div>
        <h2>blogs</h2>

        {notification ? <Notification message={notification} setMessage={setNotification}/> : <></> }

        <p>{user.name} logged in <button onClick={logout}>logout</button></p>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user}/>
        )}

        <Togglable buttonLabel={'create blog'} ref={blogFormRef}>
          <CreateBlog addBlog={addBlog}/>
        </Togglable>

      </div>
    )
  }else{
    return (
      <Login setUser={setUser} />
    )
  }
}

export default App