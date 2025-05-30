import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";

const TimerFoco = () => {

    const { focusMinutes, setFocusMinutes,
        alterFocusMinutes, resetFocusMinutes,
        setResetFocusMinutes, initialFocusMinutes } = useTimer();

    return (
        <div>
            <Timer
                minutes={focusMinutes}
                setMinutes={setFocusMinutes}
                alterMinutes={alterFocusMinutes}
                resetMinutes={resetFocusMinutes}
                setResetMinutes={setResetFocusMinutes}
                initialMinutes={initialFocusMinutes} />
        </div>
    );
};

export default TimerFoco;