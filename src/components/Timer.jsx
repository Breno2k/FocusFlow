import { useRef, useState } from 'react'

const Timer = () => {

    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const temporizador = useRef(null);

    const iniciar = () => {


        console.log("Timer iniciado!")

        // let minutos = 25

        temporizador.current = setInterval(() => {

            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    // subtrai 1 segundo do tempo atual
                    return prevSeconds - 1
                } else {
                    console.log("Decrementando minuto!")
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 0) {
                            clearInterval(temporizador);
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
    }


    const pausar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current)
    }

    if ((minutes === 0) && (seconds === 0)) {

        setSeconds(0)
        setMinutes(10)

        pausar();
    }


    const resetar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
        temporizador.current = null;
        setSeconds(0)
        setMinutes(10)
    }

    return (
        <div>
            <p>{minutes}:{seconds}</p>
            <button onClick={iniciar}>Iniciar</button>
            <button onClick={pausar}>Pausar</button>
            <button onClick={resetar}>Resetar</button>
        </div>
    )
}

export default Timer