import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setNotif } from '../reducers/notificationReducer'


const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
    if(notification.content){
      const timer = setTimeout(() => {
        dispatch(setNotif(null))
      }, 1000 * notification.timer)

      return () => clearTimeout(timer);
    }
  })

    return (
        <div>
            <p className={notification.error ? 'error' : 'notification'}>{notification.content}</p>
        </div>
    );
};

export default Notification;
