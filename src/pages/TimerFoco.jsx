import { useLocation } from "react-router-dom";
import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";
import { useEffect } from "react";

const TimerFoco = () => {

    const { focusMinutes, setFocusMinutes,
        seconds, setSeconds,
        alterFocusMinutes, resetFocusMinutes,
        setResetFocusMinutes, initialFocusMinutes,
        errorMessage, setErrorMessage,
        temporizador, iniciarFoco } = useTimer();

    const location = useLocation();

    useEffect(() => {
        if (location.state?.fromTimerEnd) {
            iniciarFoco();
        }
    }, [location])

    return (
        <div>
            <Timer
                // Minutes
                minutes={focusMinutes}
                setMinutes={setFocusMinutes}

                // Seconds
                seconds={seconds}
                setSeconds={setSeconds}

                // AlterMinutes
                alterMinutes={alterFocusMinutes}
                resetMinutes={resetFocusMinutes}

                // Mensagem de erro
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}

                // Reset Minutes
                setResetMinutes={setResetFocusMinutes}
                initialMinutes={initialFocusMinutes}

                // termorizador
                temporizador={temporizador}

                // function iniciar
                iniciar={iniciarFoco} />

        </div>
    );
};

export default TimerFoco;