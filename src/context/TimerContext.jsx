import { createContext, useState, useRef } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    // Minutos iniciais
    const [initialPauseMinutes] = useState(5)
    const [initialFocusMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0);


    // Valores padrões
    const [focusMinutes, setFocusMinutes] = useState(initialFocusMinutes);
    const [pauseMinutes, setPauseMinutes] = useState(initialPauseMinutes);

    // Reset Minutes
    const [resetFocusMinutes, setResetFocusMinutes] = useState(initialFocusMinutes)
    const [resetPauseMinutes, setResetPauseMinutes] = useState(initialPauseMinutes)

    // temporizador
    const temporizador = useRef(null);

    // função para pausar
    const pausar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
    };

    // Mensagem de erro
    const [errorMessage, setErrorMessage] = useState("");

    // Iniciar timer 
    const iniciarFoco = () => {

        console.log("Timer iniciado!")


        temporizador.current = setInterval(() => {

            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    // subtrai 1 segundo do tempo atual
                    return prevSeconds - 1
                } else {
                    console.log("Decrementando minuto!")
                    setFocusMinutes((prevMinutes) => {
                        if (prevMinutes === 0) {
                            clearInterval(temporizador.current);
                            return 0
                        };
                        // diminui 1 minuto
                        return prevMinutes - 1
                    })
                    // reseta os segundos para 59
                    return 59;
                }
            })
        }, 1000)

        setErrorMessage("");
    }


    const iniciarPause = () => {

        console.log("Timer iniciado!")


        temporizador.current = setInterval(() => {

            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    // subtrai 1 segundo do tempo atual
                    return prevSeconds - 1
                } else {
                    console.log("Decrementando minuto!")
                    setPauseMinutes((prevMinutes) => {
                        if (prevMinutes === 0) {
                            clearInterval(temporizador.current);
                            return 0
                        };
                        // diminui 1 minuto
                        return prevMinutes - 1
                    })
                    // reseta os segundos para 59
                    return 59;
                }
            })
        }, 1000)

        setErrorMessage("");
    }

    // Focus
    const alterFocusMinutes = (novoValor) => {

        const num = Number(novoValor);
        setFocusMinutes(num);

    }

    // Pause
    const alterPauseMinutes = (novoValor) => {
        // pegamos o novo valor de minutes
        const num = Number(novoValor);
        // e passamos como valor padrão para minutes
        setPauseMinutes(num);
    }

    return (
        <TimerContext.Provider value={{
            // Minutos de foco e pausa
            focusMinutes, setFocusMinutes,
            pauseMinutes, setPauseMinutes,

            // Segundos
            seconds, setSeconds,

            // Funções de iniciar
            iniciarFoco,
            iniciarPause,

            // Funções de alteração
            alterFocusMinutes,
            alterPauseMinutes,

            // Valores iniciais
            initialFocusMinutes,
            initialPauseMinutes,

            // Valores de reset
            resetFocusMinutes, setResetFocusMinutes,
            resetPauseMinutes, setResetPauseMinutes,

            // Mensagens de erro
            errorMessage, setErrorMessage,

            // Timer ref (opcional, se precisar manipular fora)
            temporizador,

            // Função de pausar
            pausar
        }}>
            {children}
        </TimerContext.Provider>

    )
}