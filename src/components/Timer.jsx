import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Timer = ({
    minutes, setMinutes, alterMinutes,
    resetMinutes, setResetMinutes, iniciar,
    temporizador, seconds, setSeconds,
    errorMessage, setErrorMessage, pausar }) => {



    const [inputMinutes, setInputMinutes] = useState("");
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


    // Alterar tempo do timer
    const handleAlterMinutes = (e) => {
        e.preventDefault();

        // criei uma constante para receber o novo valor de minutes
        const newMinutes = parseInt(inputMinutes)

        // Condição de erro
        if (newMinutes <= 0 || isNaN(newMinutes)) {
            setErrorMessage("Insira um valor plausível");
            return;
        }

        setResetMinutes(newMinutes); // atualizando valor de reset
        resetar();
        alterMinutes(newMinutes); // alterar diretamente no context como valor global
        setInputMinutes(""); // limpa o campo de inputs
    }

    // função para timer finalizado
    const timerZero = () => {

        setMinutes(resetMinutes);
    };


    // função para resetar
    const resetar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
        temporizador.current = null;
        setSeconds(0);

        timerZero();
    }

    // condição para quando o timer chega a zero
    useEffect(() => {
        if ((minutes === 0) && (seconds === 0) && !redirect) {
            setRedirect(true);
            setSeconds(0);
            resetar();

            if (location.pathname === '/TimerFocus') {
                navigate('/TimerPause', { state: { fromTimerEnd: true } });
            } else {
                navigate('/TimerFocus', { state: { fromTimerEnd: true } })
            };

            // Evita duplicação do temporizador
            clearInterval(temporizador.current);
            console.log("teste redirect")
            setRedirect(false)
        }
    }, [minutes, seconds, redirect]);




    return (
        <div>
            {/* padStart faz com que seconds sem seja exibido com dois digitos */}
            <p>{minutes}:{String(seconds).padStart(2, '0')}</p>
            <button onClick={iniciar}>Iniciar</button>
            <button onClick={pausar}>Pausar</button>
            <button onClick={resetar}>Resetar</button>

            {/* formulário para alterar minutos */}
            <form onSubmit={handleAlterMinutes}>
                <label>Qual vai ser o seu período de foco ?</label>
                <input type="number" name="minutos" value={inputMinutes} onChange={(e) => setInputMinutes(e.target.value)} />
                <button>Alterar</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Timer