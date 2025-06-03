import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TimerPause = () => {

    const { pauseMinutes, setPauseMinutes, alterPauseMinutes,
        seconds, setSeconds, errorMessage, setErrorMessage,
        resetPauseMinutes, setResetPauseMinutes, initialPauseMinutes,
        temporizador, iniciarPause, pausar } = useTimer();

    const location = useLocation();

    useEffect(() => {
        if (location.state?.fromTimerEnd) {
            iniciarPause();
        }
    }, [location])

    useEffect(() => {
        return () => {
            pausar(); // é executado ao sair da página
        };
    }, []);


    return (
        <div>
            <Timer
                // Minutes
                minutes={pauseMinutes}
                setMinutes={setPauseMinutes}

                // Seconds
                seconds={seconds}
                setSeconds={setSeconds}

                // AlterMinutes
                alterMinutes={alterPauseMinutes}
                resetMinutes={resetPauseMinutes}

                // Mensagem de erro
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}

                // Reset Minutes
                setResetMinutes={setResetPauseMinutes}
                initialMinutes={initialPauseMinutes}

                // termorizador
                temporizador={temporizador}

                // function iniciar
                iniciar={iniciarPause}

                // function de pausar
                pausar={pausar} />
        </div>
    )
}

export default TimerPause