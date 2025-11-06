import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: "BLOG",
    initialState,
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        appendBlog(state, action){
            return state.concat(action.payload)
        },
    }
})

export const {setBlogs, appendBlog} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => {
                return b.likes - a.likes;
            })
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.addBlog(blog)
        dispatch(appendBlog(newBlog))
    }
}

export const likeBlog = (id, likes) => {
    return async (dispatch, getState) => {
        const response = await blogService.likeBlog(id, likes);
                const blogs = getState().blogs
                const updatedBlogs = blogs.map((blog) => {
                    if (blog.id === id) {
                        blog = {...blog, likes: response.likes}
                    }
                    return blog
                });
                dispatch(setBlogs(updatedBlogs));
    }
}

export const removeBlog = (id, user) => {
    return async (dispatch, getState) => {
        try {
            const response = await blogService.removeBlog(id, user);
            if (response.status === 204) {
                const updatedBlogs = getState().blogs.filter((blog) => {
                    if (blog.id !== id) {
                        return blog;
                    }
                });
                dispatch(setBlogs(updatedBlogs));
            }
        } catch (err) {
            console.log('eh', err);
        }
    }
}

export default blogSlice.reducer