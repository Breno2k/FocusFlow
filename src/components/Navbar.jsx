import { NavLink } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/Cronometro">Cronômetro</NavLink>
            <NavLink to="/TimerFocus">Timer Foco</NavLink>
            <NavLink to="/TimerPause">Timer Pause</NavLink>
        </nav>
    )
}

export default Navbar