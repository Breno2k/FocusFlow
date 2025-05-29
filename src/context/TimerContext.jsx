import { createContext, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [focusMinutes, setFocusMinutes] = useState(25);
    const [pauseMinutes, setPauseMinutes] = useState(5);

    return (
        <TimerContext.Provider value={{
            focusMinutes, setFocusMinutes,
            pauseMinutes, setPauseMinutes
        }}>
            {children}
        </TimerContext.Provider>
    )
}