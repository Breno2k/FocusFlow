import Cronomentro from "../components/Cronomentro";
import { useCronometro } from "../hooks/useCronometro"

const Cronometro = () => {

    const { iniciarCronometro,
        croMinutes,
        croSeconds,
        horas } = useCronometro();

    return (
        <div>
            <Cronomentro
                //Horas
                horas={horas}

                // Minutes
                minutes={croMinutes}

                // Seconds
                seconds={croSeconds}

                // iniciar
                iniciar={iniciarCronometro}
            />
        </div>
    )
}

export default Cronometro