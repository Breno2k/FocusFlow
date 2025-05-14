import { useState } from "react";

const TimerFoco = () => {

    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(5);

    const iniciar = () => {



        console.log("Timer iniciado!")

        // let minutos = 25

        const temporizador = setInterval(() => {

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


    return (
        <div>
            <button onClick={iniciar}>click aqui</button>
            <p>{minutes}:{seconds}</p>
        </div>
    );
};

export default TimerFoco;