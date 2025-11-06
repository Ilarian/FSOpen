import { useState } from 'react';
import { NavLink } from 'react-router';

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const [showInfo, setShowInfo] = useState(false);
    const label = showInfo ? 'hide' : 'info';

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div style={blogStyle}>
            <NavLink to={`blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</NavLink>
            <button
                onClick={() => {
                    setShowInfo(!showInfo);
                }}
            >
                {label}
            </button>
            {showInfo ? (
                <>
                    <style>{'p {margin:0;}'}</style>
                    <p>{blog.url}</p>
                    <p>
                        Likes: {blog.likes}
                        <button onClick={() => likeBlog(blog.id, blog.likes)}>
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
                                    removeBlog(blog.id);
                            }}
                        >
                            remove
                        </button>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Blog;
