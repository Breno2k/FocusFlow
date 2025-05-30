import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";

const TimerFoco = () => {

    const { focusMinutes, setFocusMinutes, alterFocusMinutes } = useTimer();

    return (
        <div>
            <Timer
                minutes={focusMinutes}
                setMinutes={setFocusMinutes}
                alterMinutes={alterFocusMinutes} />
        </div>
    );
};

export default TimerFoco;