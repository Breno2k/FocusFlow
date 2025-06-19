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
        if (temporizador.current) {
            clearInterval(temporizador.current);
            temporizador.current = null;
        }
    };

    // Mensagem de erro
    const [errorMessage, setErrorMessage] = useState("");

    // Iniciar timer de foco
    const iniciarFoco = () => {
        // Se já existe um timer rodando, limpa ele primeiro
        if (temporizador.current) {
            clearInterval(temporizador.current);
        }

        // Calcula o tempo total em segundos
        const totalSeconds = focusMinutes * 60 + focusSeconds;

        // Define quando o timer deve terminar (timestamp futuro)
        const endTime = Date.now() + (totalSeconds * 1000);

        // Função para atualizar o display do timer
        const updateTimer = () => {
            const now = Date.now();
            const remainingMs = endTime - now;

            // Se o tempo acabou
            if (remainingMs <= 0) {
                setFocusMinutes(0);
                setFocusSeconds(0);
                clearInterval(temporizador.current);
                temporizador.current = null;
                // Aqui você pode adicionar callbacks ou notificações
                console.log("Timer de foco finalizado!");
                return;
            }

            // Converte milissegundos restantes para minutos e segundos
            const remainingSeconds = Math.ceil(remainingMs / 1000);
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;

            // Atualiza o estado apenas se houve mudança
            setFocusMinutes(prev => prev !== minutes ? minutes : prev);
            setFocusSeconds(prev => prev !== seconds ? seconds : prev);
        };

        // Atualiza imediatamente
        updateTimer();

        // Configura o intervalo
        temporizador.current = setInterval(updateTimer, 1000);

        setErrorMessage("");
    }

    // Iniciar timer de pausa
    const iniciarPause = () => {
        // Se já existe um timer rodando, limpa ele primeiro
        if (temporizador.current) {
            clearInterval(temporizador.current);
        }

        // Calcula o tempo total em segundos
        const totalSeconds = pauseMinutes * 60 + pauseSeconds;

        // Define quando o timer deve terminar (timestamp futuro)
        const endTime = Date.now() + (totalSeconds * 1000);

        // Função para atualizar o display do timer
        const updateTimer = () => {
            const now = Date.now();
            const remainingMs = endTime - now;

            // Se o tempo acabou
            if (remainingMs <= 0) {
                setPauseMinutes(0);
                setPauseSeconds(0);
                clearInterval(temporizador.current);
                temporizador.current = null;
                // Aqui você pode adicionar callbacks ou notificações
                console.log("Timer de pausa finalizado!");
                return;
            }

            // Converte milissegundos restantes para minutos e segundos
            const remainingSeconds = Math.ceil(remainingMs / 1000);
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;

            // Atualiza o estado apenas se houve mudança
            setPauseMinutes(prev => prev !== minutes ? minutes : prev);
            setPauseSeconds(prev => prev !== seconds ? seconds : prev);
        };

        // Atualiza imediatamente
        updateTimer();

        // Configura o intervalo
        temporizador.current = setInterval(updateTimer, 1000);

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

    // Função para resetar o timer de foco
    const resetarFoco = () => {
        pausar();
        setFocusMinutes(resetFocusMinutes);
        setFocusSeconds(0);
    }

    // Função para resetar o timer de pausa
    const resetarPause = () => {
        pausar();
        setPauseMinutes(resetPauseMinutes);
        setPauseSeconds(0);
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

            // Funções de reset
            resetarFoco,
            resetarPause,

            // Mensagens de erro
            errorMessage, setErrorMessage,

            // Timer ref (opcional, se precisar manipular fora)
            temporizador,

            // Função de pausar
            pausar,
        }}>
            {children}
        </TimerContext.Provider>
    )
}