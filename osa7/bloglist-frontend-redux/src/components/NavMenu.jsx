import { NavLink } from "react-router"

const NavMenu = () => {

    return (
            <nav>
                <NavLink to="/">Blogs</NavLink>
                <NavLink to="/users"></NavLink>
            </nav>
    )

}

export default NavMenu