import { useEffect } from 'react'

const Notification = ({ message, setMessage, timeout = 3, error = false }) => {

  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, timeout * 1000)
  }, [])

  return (
    <div>
      <p className={error ? 'error' : 'notification'}>{message}</p>
    </div>
  )
}

export default Notification