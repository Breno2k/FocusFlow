import { createContext, useState, useRef } from "react";

export const CronometroContext = createContext();

export const CronomemetroProvider = ({ children }) => {

    // Horas
    const [horas, setHoras] = useState(0);

    // Minutos
    const [croMinutes, setCroMinutes] = useState(0);

    // Segundos
    const [croSeconds, setCroSeconds] = useState(0);

    // iniciais
    const [cronometroStartTime, setCronometroStartTime] = useState(null);
    const [cronometroInitialSeconds, setCronometroInitialSeconds] = useState(0);

    // temporizador
    const temporizador = useRef(null);

    // Iniciar Cronômetro
    const iniciarCronometro = () => {

        // Se já existe um timer rodando, limpa ele primeiro
        if (temporizador.current) {
            clearInterval(temporizador.current);
        }

        // Armazena quando o cronômetro começou e o tempo inicial
        const initialTotalSeconds = horas * 3600 + croMinutes * 60 + croSeconds;
        setCronometroStartTime(Date.now());
        setCronometroInitialSeconds(initialTotalSeconds);

        temporizador.current = setInterval(() => {

            // Verifica se o tempo está correto baseado no timestamp
            const elapsedSeconds = Math.floor((Date.now() - cronometroStartTime) / 1000);
            const shouldHaveSeconds = cronometroInitialSeconds + elapsedSeconds;
            const currentTotalSeconds = horas * 3600 + croMinutes * 60 + croSeconds;

            // Se a diferença for maior que 2 segundos, corrige o cronômetro
            if (Math.abs(currentTotalSeconds - shouldHaveSeconds) > 2) {
                const correctHours = Math.floor(shouldHaveSeconds / 3600);
                const correctMinutes = Math.floor((shouldHaveSeconds % 3600) / 60);
                const correctSeconds = shouldHaveSeconds % 60;

                setHoras(correctHours);
                setCroMinutes(correctMinutes);
                setCroSeconds(correctSeconds);
                return;
            }

            setCroSeconds((prevSeconds) => {
                if (prevSeconds < 59) {
                    // incrementa mais 1 segundo
                    return prevSeconds + 1
                } else {
                    setCroMinutes(prevMinutes => {
                        if (prevMinutes < 59) {
                            // incrementa mais 1 minutos
                            return prevMinutes + 1
                        } else {
                            // incrementea mais uma hora
                            setHoras(prevHoras => prevHoras + 1)
                            // reinicia minutos
                            return 0
                        }
                    })
                    // reinicia segundos
                    return 0
                }
            })
        }, 1000)
    }

    return (
        <CronometroContext.Provider value={{
            iniciarCronometro,
            croMinutes, setCroMinutes,
            croSeconds, setCroSeconds,
            horas, setHoras, temporizador
        }}>
            {children}
        </CronometroContext.Provider>
    )
}