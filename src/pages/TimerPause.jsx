import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";

const TimerPause = () => {

    const { pauseMinutes, setPauseMinutes, alterPauseMinutes } = useTimer();

    return (
        <div>
            <h3>Timer pause</h3>
            <Timer
                minutes={pauseMinutes}
                setMinutes={setPauseMinutes}
                alterMinutes={alterPauseMinutes} />
        </div>
    )
}

export default TimerPause