import { useContext, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {

  const { notification, notificationDispatch } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    const timer = setTimeout( () => {
      notificationDispatch({type: 'NULL'})
    }, 5000)

    return () => clearTimeout(timer)
  })
  
  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
