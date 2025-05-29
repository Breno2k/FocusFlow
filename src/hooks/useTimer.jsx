import { useContext } from "react"
import { TimerContext } from "../context/TimerContext"

export function useTimer() {
    return useContext(TimerContext)
}