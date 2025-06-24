import { useContext } from "react";
import { CronometroContext } from "../context/CronometroContext";

export const useControls = () => {

    const {
        temporizador, setHoras, setCroMinutes, setCroSeconds
    } = useContext(CronometroContext)


    const pausar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
    };

    // função para resetar
    const resetar = () => {
        // cleartInterval consegue pausar o temporizador
        clearInterval(temporizador.current);
        temporizador.current = null;
        setHoras(0);
        setCroMinutes(0);
        setCroSeconds(0);
        console.log('resetado')
    };

    return {
        pausar, resetar
    }

}