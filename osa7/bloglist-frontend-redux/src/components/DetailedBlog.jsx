import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { removeBlog, likeBlog } from "../reducers/blogReducer"

const DetailedBlog = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const blog = blogs.find(blog => blog.id === id)

    const handleRemoveBlog = (id) => {
        console.log("hello?")
        dispatch(removeBlog(id, user))
        navigate(-1)
    };

    const handleLikeBlog = (id, likes) => {
        dispatch(likeBlog(id, likes))
    };

    return (
        blog ? 
        <div>
            <style>{'p {margin:0;}'}</style>
                <h1>{blog.title}</h1>
                <a href={`www.${blog.url}`}>{blog.url}</a>
                <p>
                    Likes: {blog.likes}
                    <button onClick={() => handleLikeBlog(blog.id, blog.likes)}>
                        like
                    </button>
                </p>
                <p>{blog.user.name}</p>
                {blog.user.name === user.name ? (
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Do you want to remove this blog?',
                                )
                            )
                                handleRemoveBlog(blog.id);
                        }}
                    >
                        remove
                    </button>
                ) : (
                    <></>
                )}
        </div> : <h2>No blog found</h2>
            )
}

export default DetailedBlog