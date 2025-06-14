import { createContext, useState, useRef } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    // Minutos iniciais
    const [initialPauseMinutes] = useState(5)
    const [initialFocusMinutes] = useState(25)



    // Valores padrões
    const [focusMinutes, setFocusMinutes] = useState(initialFocusMinutes);
    const [focusSeconds, setFocusSeconds] = useState(0);

    const [pauseSeconds, setPauseSeconds] = useState(0);
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

        // Se já existe um timer rodando, limpa ele primeiro
        if (temporizador.current) {
            clearInterval(temporizador.current);
        }

        temporizador.current = setInterval(() => {

            setFocusSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    // subtrai 1 segundo do tempo atual
                    return prevSeconds - 1
                } else {

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

        // Se já existe um timer rodando, limpa ele primeiro
        if (temporizador.current) {
            clearInterval(temporizador.current);
        }

        temporizador.current = setInterval(() => {

            setPauseSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    // subtrai 1 segundo do tempo atual
                    return prevSeconds - 1
                } else {

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

    // Alter focus
    const alterFocusMinutes = (novoValor) => {

        const num = Number(novoValor);
        setFocusMinutes(num);

    }

    // Alter pause
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
            focusSeconds, setFocusSeconds,
            pauseSeconds, setPauseSeconds,

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