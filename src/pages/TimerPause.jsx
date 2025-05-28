import Timer from "../components/Timer";

const TimerPause = () => {
    return (
        <div>
            <h3>Timer pause</h3>
            <Timer initialMinutes={5} />
        </div>
    )
}

export default TimerPause