import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {setNotif} from '../reducers/notificationReducer'
import login from '../services/users';
import Notification from './Notification';
import {setUser} from '../reducers/userReducer'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const user = await login.login(username, password);
            window.localStorage.setItem('user', JSON.stringify(user));
            dispatch(setUser(user));
        } catch (err) {
            dispatch(setNotif(err.message.toString(), 3, true))
        }
    };

    return (
        <div className="flex login">
            <h1>Log in to application</h1>
            {notification.error ? (
                <Notification />
            ) : (
                <></>
            )}
            <input
                type=""
                placeholder="Username"
                onChange={handleUsername}
            ></input>
            <input
                type="password"
                placeholder="password"
                onChange={handlePassword}
            ></input>
            <button onClick={handleLogin}>login</button>
        </div>
    );
};

export default Login;
