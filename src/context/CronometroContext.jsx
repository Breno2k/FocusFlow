import { createContext, useState, useRef } from "react";

export const CronometroContext = createContext();

export const CronomemetroProvider = ({ children }) => {

    // Horas
    const [horas, setHoras] = useState(0);

    // Minutos
    const [croMinutes, setCroMinutes] = useState(0);

    // Segundos
    const [croSeconds, setCroSeconds] = useState(0);

    // temporizador
    const temporizador = useRef(null);

    // Iniciar Cronômetro
    const iniciarCronometro = () => {
        // Se já existe um timer rodando, limpa ele primeiro
        if (temporizador.current) {
            clearInterval(temporizador.current);
        }

        // Calcula o tempo total inicial em segundos (tempo que já estava no cronômetro)
        const initialTotalSeconds = horas * 3600 + croMinutes * 60 + croSeconds;

        // Define quando o cronômetro começou a contar
        const startTime = Date.now();

        // Função para atualizar o display do cronômetro
        const updateCronometro = () => {
            const now = Date.now();
            const elapsedMs = now - startTime;
            const elapsedSeconds = Math.floor(elapsedMs / 1000);

            // Soma o tempo inicial com o tempo decorrido
            const totalSeconds = initialTotalSeconds + elapsedSeconds;

            // Converte para horas, minutos e segundos
            const newHoras = Math.floor(totalSeconds / 3600);
            const newMinutos = Math.floor((totalSeconds % 3600) / 60);
            const newSegundos = totalSeconds % 60;

            // Atualiza o estado apenas se houve mudança
            setHoras(prev => prev !== newHoras ? newHoras : prev);
            setCroMinutes(prev => prev !== newMinutos ? newMinutos : prev);
            setCroSeconds(prev => prev !== newSegundos ? newSegundos : prev);
        };

        // Atualiza imediatamente
        updateCronometro();

        // Configura o intervalo
        temporizador.current = setInterval(updateCronometro, 1000);
    }


    return (
        <CronometroContext.Provider value={{
            // Estados do cronômetro
            horas, setHoras,
            croMinutes, setCroMinutes,
            croSeconds, setCroSeconds,

            // Funções principais
            iniciarCronometro,

            // Referência do timer (se precisar acessar externamente)
            temporizador,
        }}>
            {children}
        </CronometroContext.Provider>
    )
}