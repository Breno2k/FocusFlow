import { TimerContext } from "../context/TimerContext"
import { useContext } from "react"

export const useTimer = () => useContext(TimerContext);
