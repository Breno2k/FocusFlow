import { useControls } from "../hooks/useControls"
import "./Timer.css"
import { toast } from "sonner"


const Cronomentro = ({ horas, minutes, seconds, iniciar }) => {

    const { pausar, resetar } = useControls();

    return (
        <div>
            {/* padStart faz com que seconds sem seja exibido com dois digitos */}
            <p className="timer_cro">{horas}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
            <button className="!bg-white text-black hover:!border-black" onClick={() => {

                iniciar();

                toast("O cronômetro começou a contar!", {
                    description: `Acompanhe seu tempo total de produtividade.`,
                    className: "toast-custom",
                    style: {
                        border: '1px solid #00ff41',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: '#00ff41',
                        boxShadow: '0 4px 12px rgba(0, 255, 65, 0.3)',
                        textAlign: 'left',
                    },
                    action: {
                        label: <span
                            className="material-symbols-outlined"
                            style={{
                                color: '#00ff41',
                                textShadow: '0 0 8px #00ff41',
                                fontSize: '18px'
                            }}
                        >
                            check_circle
                        </span>,
                    },
                });
            }}>Iniciar</button>
            <button className="material-symbols-outlined" onClick={() => {


                pausar();

                toast("O cronômetro foi pausado!", {
                    description: `Seu tempo total está em espera.`,
                    className: "toast-custom",
                    style: {
                        border: '1px solid #00ff41',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: '#00ff41',
                        boxShadow: '0 4px 12px rgba(0, 255, 65, 0.3)',
                        textAlign: 'left',
                    },
                    action: {
                        label: <span
                            className="material-symbols-outlined"
                            style={{
                                color: '#00ff41',
                                textShadow: '0 0 8px #00ff41',
                                fontSize: '18px'
                            }}
                        >
                            check_circle
                        </span>,
                    },
                });
            }}>pause</button>
            <button className="material-symbols-outlined" onClick={() => {


                resetar();

                toast("O cronômetro foi resetado!", {
                    description: `Tempo total zerado e pronto para um novo começo.`,
                    className: "toast-custom",
                    style: {
                        border: '1px solid #00ff41',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: '#00ff41',
                        boxShadow: '0 4px 12px rgba(0, 255, 65, 0.3)',
                        textAlign: 'left',
                    },
                    action: {
                        label: <span
                            className="material-symbols-outlined"
                            style={{
                                color: '#00ff41',
                                textShadow: '0 0 8px #00ff41',
                                fontSize: '18px'
                            }}
                        >
                            check_circle
                        </span>,
                    },
                });
            }}>refresh</button>
        </div>
    )
}

export default Cronomentro