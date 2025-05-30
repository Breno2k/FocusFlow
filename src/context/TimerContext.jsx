import { createContext, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [focusMinutes, setFocusMinutes] = useState(25);
    const [pauseMinutes, setPauseMinutes] = useState(5);


    const alterFocusMinutes = (novoValor) => {
        // focus
        const num = Number(novoValor);
        setFocusMinutes(num);

    }

    const alterPauseMinutes = (novoValor) => {
        // pause
        const num = Number(novoValor);
        setPauseMinutes(num);
    }

    return (
        <TimerContext.Provider value={{
            focusMinutes, setFocusMinutes,
            pauseMinutes, setPauseMinutes,
            alterFocusMinutes, alterPauseMinutes,
        }}>
            {children}
        </TimerContext.Provider>
    )
}