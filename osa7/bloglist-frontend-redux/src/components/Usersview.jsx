import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router'
const Usersview = () => {
    const users = useSelector(state => state.users)
    
    return (
        <table>
            <tbody>
                <tr>
                    <th>Users</th>
                    <th>Blogs created</th>
                </tr>
                {users ?
                    users.map(u =>
                    <tr key={u.id}>
                        <td><NavLink to={u.id}>{u.name}</NavLink></td>
                        <td>{u.blogs.length}</td>
                    </tr>
                )
            :
                <></>}
            </tbody>
        </table>
    )    
}

export default Usersview