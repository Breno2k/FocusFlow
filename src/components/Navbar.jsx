import { NavLink, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"
import cronometroFoto from "../assets/cronometro.png"
import pause from "../assets/pause-break.png"
import focus from "../assets/focus-session.png"

const Navbar = () => {

    const location = useLocation()
    const isHome = location.pathname === "/";

    if (isHome) {
        return (
            <nav className={`${styles.nav} ${styles.homeNav}`}>
                <NavLink to="/Cronometro" className={styles.card}>
                    <img src={cronometroFoto} alt="Cronômetro" />
                    <h2>Cronômetro</h2>
                </NavLink>

                <NavLink to="/TimerFocus" className={styles.card}>
                    <img src={focus} alt="Timer Foco" />
                    <h2>Timer Foco</h2>
                </NavLink>

                <NavLink to="/TimerPause" className={styles.card}>
                    <img src={pause} alt="Timer Pausa" />
                    <h2>Timer Pausa</h2>
                </NavLink>
            </nav>
        );
    }

    // Estilo padrão fora da home
    return (
        <nav className={styles.nav}>
            <NavLink to="/Cronometro">Cronômetro</NavLink>
            <NavLink to="/TimerFocus">Timer Foco</NavLink>
            <NavLink to="/TimerPause">Timer Pausa</NavLink>
        </nav>
    );
};

export default Navbar;