import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TimerPause = () => {

    const { pauseMinutes, setPauseMinutes, alterPauseMinutes,
        pauseSeconds, setPauseSeconds, errorMessage, setErrorMessage,
        resetPauseMinutes, setResetPauseMinutes, initialPauseMinutes,
        temporizador, iniciarPause, pausar,
        setTimerStartTimePause, setInitialTotalSecondsPause, } = useTimer();

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
                seconds={pauseSeconds}
                setSeconds={setPauseSeconds}

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
                pausar={pausar}

                // Prevenção guia p/ inativa 
                setTimerStartTime={setTimerStartTimePause}
                setInitialTotalSeconds={setInitialTotalSecondsPause} />
        </div>
    )
}

export default TimerPause