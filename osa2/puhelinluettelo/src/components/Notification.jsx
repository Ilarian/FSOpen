import "../styles/notification.css"

const Notification = ({message, error}) => {



    return (
        <div className={error ? "errNotification" : "notification"}>
            <p>{message}</p>
        </div>
    )
}

export default Notification