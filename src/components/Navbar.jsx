import { NavLink } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/">Timer Foco</NavLink>
            <NavLink to="/TimerPause">Timer Pause</NavLink>
        </nav>
    )
}

export default Navbar