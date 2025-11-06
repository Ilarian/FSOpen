import Togglable from './Togglabe';
import CreateBlog from './CreateBlog';
import Blog from './Blog';

import blogService from '../services/blogs';

import { setBlogs, likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotif } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'
import { useRef } from 'react';

const Blogview = ({blogs, user}) => {

    const dispatch = useDispatch()
    const blogFormRef = useRef();

    const handleLike = (id, likes) => {
            dispatch(likeBlog(id, likes))
        };
    
    const handleRemoveBlog = (id) => {
        dispatch(removeBlog(id, user))
    };

    const addBlog = async (newBlog) => {
        try {
            const req = await blogService.addBlog(newBlog);
            const addedBlog = { ...req, user: user };
            dispatch(setBlogs(blogs.concat(addedBlog)));
            dispatch(setNotif('Blog created successfully!', 3))
            blogFormRef.current.toggleVisibility();
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={handleLike}
                    removeBlog={handleRemoveBlog}
                    user={user}
                />
            ))}
            <Togglable buttonLabel={'create blog'} ref={blogFormRef}>
                <CreateBlog addBlog={addBlog} />
            </Togglable>
        </div>
    )
}

export default Blogview