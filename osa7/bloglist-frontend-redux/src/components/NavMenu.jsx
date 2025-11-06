import { NavLink } from "react-router"

const NavMenu = () => {

    return (
            <nav>
                <NavLink to="/">Blogs</NavLink>
                <NavLink to="/users">Users</NavLink>
            </nav>
    )

}

export default NavMenu