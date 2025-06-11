import { useControls } from "../hooks/useControls"
import "./Timer.css"


const Cronomentro = ({ horas, minutes, seconds, iniciar }) => {

    const { pausar, resetar } = useControls();

    return (
        <div>
            {/* padStart faz com que seconds sem seja exibido com dois digitos */}
            <p className="timer_cro">{horas}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
            <button onClick={iniciar}>Iniciar</button>
            <button className="material-symbols-outlined" onClick={pausar}>pause</button>
            <button className="material-symbols-outlined" onClick={resetar}>refresh</button>
        </div>
    )
}

export default Cronomentro