import { createContext, useState, useRef } from "react";

export const CronometroContext = createContext();

export const CronomemetroProvider = ({ children }) => {

    // Horas
    const [initialHoras, setInitialHoras] = useState(0);
    const [horas, setHoras] = useState(initialHoras);

    // Minutos
    const [initialCroMinutes, setCroInitialMinutes] = useState(0);
    const [croMinutes, setCroMinutes] = useState(initialCroMinutes);

    // Segundos
    const [initialCroSeconds, setCroInitialSeconds] = useState(0);
    const [croSeconds, setCroSeconds] = useState(initialCroSeconds);

    // Mensagem de erro
    const [errorMessage, setErrorMessage] = useState("");
}