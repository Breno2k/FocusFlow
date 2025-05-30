import Timer from "../components/Timer";
import { useTimer } from "../hooks/useTimer";

const TimerPause = () => {

    const { pauseMinutes, setPauseMinutes, alterPauseMinutes,
        resetPauseMinutes, setResetPauseMinutes, initialPauseMinutes } = useTimer();

    return (
        <div>
            <h3>Timer pause</h3>
            <Timer
                minutes={pauseMinutes}
                setMinutes={setPauseMinutes}
                alterMinutes={alterPauseMinutes}
                resetMinutes={resetPauseMinutes}
                setResetMinutes={setResetPauseMinutes}
                initialMinutes={initialPauseMinutes} />
        </div>
    )
}

export default TimerPause