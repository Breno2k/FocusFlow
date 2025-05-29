import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";

const TimerFoco = () => {

    const { focusMinutes, setFocusMinutes } = useTimer();

    return (
        <div>
            <Timer minutes={focusMinutes} setMinutes={setFocusMinutes} />
        </div>
    );
};

export default TimerFoco;