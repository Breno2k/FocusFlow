import { createContext, useState, useRef } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    // Minutos iniciais
    const [initialPauseMinutes] = useState(5)
    const [initialFocusMinutes] = useState(25)

    const [timerStartTime, setTimerStartTime] = useState(null);
    const [initialTotalSeconds, setInitialTotalSeconds] = useState(0);

    const [timerStartTimePause, setTimerStartTimePause] = useState(null);
    const [initialTotalSecondsPause, setInitialTotalSecondsPause] = useState(0);

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

            // Armazena quando o timer começou e o tempo total inicial
            const totalSeconds = focusMinutes * 60 + focusSeconds;
            setTimerStartTime(Date.now());
            setInitialTotalSeconds(totalSeconds);

            // NOVA LINHA: Verifica se o tempo está correto baseado no timestamp
            const elapsedSeconds = Math.floor((Date.now() - timerStartTime) / 1000);
            const shouldHaveSeconds = initialTotalSeconds - elapsedSeconds;
            const currentSeconds = focusMinutes * 60 + focusSeconds;

            // Se a diferença for maior que 2 segundos, corrige o timer
            if (Math.abs(currentSeconds - shouldHaveSeconds) > 2) {
                const correctMinutes = Math.floor(shouldHaveSeconds / 60);
                const correctSeconds = shouldHaveSeconds % 60;

                if (shouldHaveSeconds <= 0) {
                    setFocusMinutes(0);
                    setFocusSeconds(0);
                    clearInterval(temporizador.current);
                    return;
                }

                setFocusMinutes(correctMinutes);
                setFocusSeconds(correctSeconds);
                return;
            }

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

        // Armazena quando o timer começou e o tempo total inicial
        const totalSecondsPause = pauseMinutes * 60 + pauseSeconds;
        setTimerStartTimePause(Date.now());
        setInitialTotalSecondsPause(totalSecondsPause);

        // NOVA LINHA: Verifica se o tempo está correto baseado no timestamp
        const elapsedSecondsPause = Math.floor((Date.now() - timerStartTimePause) / 1000);
        const shouldHaveSecondsPause = initialTotalSecondsPause - elapsedSecondsPause;
        const currentSecondsPause = pauseMinutes * 60 + pauseSeconds;

        // Se a diferença for maior que 2 segundos, corrige o timer
        if (Math.abs(currentSecondsPause - shouldHaveSecondsPause) > 2) {
            const correctMinutesPause = Math.floor(shouldHaveSecondsPause / 60);
            const correctSecondsPause = shouldHaveSecondsPause % 60;

            if (shouldHaveSecondsPause <= 0) {
                setPauseMinutes(0);
                setPauseSeconds(0);
                clearInterval(temporizador.current);
                return;
            }

            setPauseMinutes(correctMinutesPause);
            setPauseSeconds(correctSecondsPause);
            return;
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