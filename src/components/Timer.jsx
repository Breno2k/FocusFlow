import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Timer = ({
    minutes, setMinutes, alterMinutes,
    resetMinutes, setResetMinutes, initialMinutes }) => {


    const [seconds, setSeconds] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [inputMinutes, setInputMinutes] = useState("");
    const [redirect, setRedirect] = useState(false);

    const temporizador = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const iniciar = () => {

        console.log("Timer iniciado!")


        temporizador.current = setInterval(() => {

            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    // subtrai 1 segundo do tempo atual
                    return prevSeconds - 1
                } else {
                    console.log("Decrementando minuto!")
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 0) {
                            clearInterval(temporizador);
                            return 0
                        };
                        // diminui 1 minuto
                        return prevMinutes - 1
                    })
                    // reseta os segundos para 59
                    return 5;
                }
            })
        }, 1000)

        setErrorMessage("");
    }

    // Alterar tempo do timer
    const handleAlterMinutes = (e) => {
        e.preventDefault();

        // criei uma constante para receber o novo valor de minutes
        const newMinutes = parseInt(inputMinutes)

        // Condição de erro
        if (newMinutes <= 0) {
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

    // função para pausar
    const pausar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
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
                navigate('/TimerPause');
            } else {
                navigate('/TimerFocus')
            };
            console.log("teste redirect")
            iniciar()
            setRedirect(false)
        }
    }, [minutes, seconds, redirect]);


    const voltarAoPadrao = () => {
        setResetMinutes(initialMinutes); // redefine o padrão de reset
        setMinutes(initialMinutes); // redefine o timer atual
    };

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