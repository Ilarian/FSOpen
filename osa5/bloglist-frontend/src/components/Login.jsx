import { useState } from 'react'
import login from '../services/users'
import ErrorMessage from './Notification'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async() => {
    try{
      const user = await login.login(username, password)
      console.log(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }catch(err){
      console.log(err.message)
      setError(err.message.toString())
    }
  }

  return(
    <div className="flex login">
      <h1>Log in to application</h1>
      {error ? <ErrorMessage message={error} setMessage={setError} error={true}/> : <></>}
      <input type="" placeholder="Username" onChange={handleUsername}></input>
      <input type="password" placeholder="password" onChange={handlePassword}></input>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default Login