import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if(notification){
      const timer = setTimeout(() => {
        dispatch(setNotification(null))
      }, 1000 * notification.timer)

      return () => clearTimeout(timer);
    }
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    notification ? 
      <div style={style}>
        {notification.content}
      </div>
    :
      <></>
  )
}

export default Notification