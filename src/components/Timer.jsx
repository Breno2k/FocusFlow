import { useRef, useState } from 'react'

const Timer = () => {

    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(5);
    const temporizador = useRef(null);

    const iniciar = () => {


        console.log("Timer iniciado!")

        // let minutos = 25

        temporizador.current = setInterval(() => {

            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1
                } else {
                    console.log("Decrementando minuto!")
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 0) {
                            clearInterval(temporizador);
                            return 0
                        };
                        return prevMinutes - 1
                    })
                    return 5;
                }
            })
        }, 1000)
    }

    const pausar = () => {
        clearInterval(temporizador.current)


    }

    return (
        <div>
            <button onClick={iniciar}>Inicar</button>
            <p>{minutes}:{seconds}</p>
            <button onClick={pausar}>Pausar</button>
        </div>
    )
}

export default Timer