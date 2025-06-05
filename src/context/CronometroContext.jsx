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

        temporizador.current = setInterval(() => {

            setCroSeconds((prevSeconds) => {
                if (prevSeconds < 9) {

                    // incrementa mais 1 segundo
                    return prevSeconds + 1

                } else {
                    setCroMinutes(prevMinutes => {
                        if (prevMinutes < 9) {

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
            horas, setHoras
        }}>
            {children}
        </CronometroContext.Provider>
    )
}