import { createContext, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    // Minutos iniciais
    const [initialPauseMinutes] = useState(5)
    const [initialFocusMinutes] = useState(25)

    // Valores padrões
    const [focusMinutes, setFocusMinutes] = useState(initialFocusMinutes);
    const [pauseMinutes, setPauseMinutes] = useState(initialPauseMinutes);

    // Reset Minutes
    const [resetFocusMinutes, setResetFocusMinutes] = useState(initialFocusMinutes)
    const [resetPauseMinutes, setResetPauseMinutes] = useState(initialPauseMinutes)


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
            initialFocusMinutes, initialPauseMinutes,
            resetFocusMinutes, setResetFocusMinutes,
            resetPauseMinutes, setResetPauseMinutes
        }}>
            {children}
        </TimerContext.Provider>
    )
}