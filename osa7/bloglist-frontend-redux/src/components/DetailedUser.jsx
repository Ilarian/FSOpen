import { useParams } from "react-router"
import { useSelector } from "react-redux"

const DetailedUser = () => {
    const {id} = useParams()
    const users = useSelector(state => state.users)
    const user = users.filter(user => user.id === id)[0]
    console.log(user)
    return (
        user ? <div>
            <h1>{user.name}</h1>
            <h2>Added blogs:</h2>
            <ul>{user.blogs ? user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>) : <></>}</ul>
        </div>
        :
        <></>
    )
}

export default DetailedUser