import { useRef, useState } from 'react'

const Timer = () => {

    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const temporizador = useRef(null);
    const [alterMinutes, setAlterMinutes] = useState()

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
                    return 5;
                }
            })
        }, 1000)
    }

    // Alterar tempo do timer
    const handleAlterMinutes = (e) => {
        e.preventDefault();

        resetar();
    }

    // função para pausar
    const pausar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current)
    }

    // função para resetar
    const resetar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
        temporizador.current = null;
        setSeconds(0)
        setMinutes(alterMinutes)
    }

    // condição para quando o timer chega a zero
    if ((minutes === 0) && (seconds === 0)) {

        setSeconds(0)
        setMinutes(alterMinutes)

        pausar();
    }

    return (
        <div>
            <p>{minutes}:{seconds}</p>
            <button onClick={iniciar}>Iniciar</button>
            <button onClick={pausar}>Pausar</button>
            <button onClick={resetar}>Resetar</button>
            <form onSubmit={handleAlterMinutes}>
                <label>Qual vai ser o seu período de foco ?</label>
                <input type="number" name="minutos" value={alterMinutes} onChange={(e) => setAlterMinutes(e.target.value)} />
                <button>Alterar</button>
            </form>
        </div>
    )
}

export default Timer