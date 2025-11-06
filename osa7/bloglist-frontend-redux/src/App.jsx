import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router";
import Blogview from './components/Blogview';
import DetailedUser from './components/DetailedUser';
import Login from './components/Login';
import Notification from './components/Notification';
import Usersview from './components/Usersview';
import DetailedBlog from './components/DetailedBlog';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';
import './style/main.css';
import NavMenu from './components/NavMenu';

const App = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification.content)

    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        if (window.localStorage.getItem('user') && !user) {
            dispatch(setUser(JSON.parse(window.localStorage.getItem('user'))))
        }
    }, []);

    const logout = () => {
        window.localStorage.removeItem('user');
        dispatch(setUser(null));
    };

    if (user) {
        return (
            <div>
                <NavMenu />
                <h2>Blogs</h2>
                {notification ? (
                    <Notification/>
                ) : (
                    <></>
                )}
                <p>
                    {user.name} logged in{' '}
                    <button onClick={logout}>logout</button>
                </p>

                <Routes>
                    <Route path="/" element={<Blogview blogs={blogs} user={user}/>} />
                    <Route path="users" element={<Usersview />} />
                    <Route path="users/:id" element={<DetailedUser />} />
                    <Route path="blogs/:id" element={<DetailedBlog />} />
                </Routes>
            </div>
        );
    } else {
        return <Login />;
    }
};

export default App;
