import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";

const TimerPause = () => {

    const { pauseMinutes, setPauseMinutes } = useTimer();

    return (
        <div>
            <h3>Timer pause</h3>
            <Timer minutes={pauseMinutes} setMinutes={setPauseMinutes} />
        </div>
    )
}

export default TimerPause