import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';
import { Minus, Plus } from "lucide-react"
import "./Timer.css"
import musica from "../assets/songs/ding-101492.mp3"
import { toast } from "sonner"


const Timer = ({
    minutes, alterMinutes,
    setResetMinutes, iniciar,
    temporizador, seconds, setSeconds,
    errorMessage, setErrorMessage, pausar, resetar }) => {


    const [inputMinutes, setInputMinutes] = useState("");
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const som = new Audio(musica);

    // Alterar tempo do timer
    const handleAlterMinutes = (e) => {

        e.preventDefault();

        // limpa mensagem de error
        setErrorMessage("")

        // criei uma constante para receber o novo valor de minutes
        const newMinutes = parseInt(inputMinutes)

        // Condição de erro
        if (newMinutes <= 0 || isNaN(newMinutes)) {
            setErrorMessage("Insira um valor plausível");
            return;
        }

        setResetMinutes(newMinutes); // atualizando valor de reset
        resetar();
        alterMinutes(newMinutes); // alterar diretamente no context como valor global
        // limpa o campo de inputs
    }



    // condição para quando o timer chega a zero
    useEffect(() => {
        if ((minutes === 0) && (seconds === 0) && !redirect) {
            setRedirect(true);
            som.play();
            setSeconds(0);
            resetar();


            if (location.pathname === '/TimerFocus') {
                navigate('/TimerPause', { state: { fromTimerEnd: true } });
            } else {
                navigate('/TimerFocus', { state: { fromTimerEnd: true } })
            };

            // Evita duplicação do temporizador
            clearInterval(temporizador.current);

            setRedirect(false);
        }
    }, [minutes, seconds, redirect]);




    return (
        <div>
            {/* padStart faz com que seconds sem seja exibido com dois digitos */}
            <p className="timer">{minutes}:{String(seconds).padStart(2, '0')}</p>
            <button className="!bg-white text-black hover:!border-black" onClick={iniciar}>Iniciar</button>
            <button className="material-symbols-outlined" onClick={pausar}>pause</button>
            <button className="material-symbols-outlined" onClick={resetar}>refresh</button>

            <Drawer>
                <DrawerTrigger asChild>
                    <button className="py-2.5 px-5 material-symbols-outlined" variant="outline">settings</button>
                </DrawerTrigger>
                <DrawerContent className="bg-black dark:bg-gray-900">
                    <div className="mx-auto w-full max-w-sm bg-black dark:bg-gray-900">
                        <DrawerHeader>
                            {location.pathname === '/TimerFocus' && <DrawerTitle>Período de Foco</DrawerTitle>}
                            {location.pathname !== '/TimerFocus' && <DrawerTitle>Período de Pausa</DrawerTitle>}
                            <DrawerDescription>
                                Defina quantos minutos você quer focar nesta sessão.
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => setInputMinutes(Math.max(1, Number(inputMinutes - 1)))}
                                    disabled={inputMinutes <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                    <span className="sr-only">Diminuir</span>
                                </Button>

                                <div className="flex-1 text-center">
                                    <input
                                        type="number"
                                        value={inputMinutes}
                                        onChange={(e) => {

                                            const value = e.target.value
                                            // isso faz com que o usuário só digite números com 2 digitos
                                            if (value.length <= 2) {
                                                setInputMinutes(Number(value))
                                            }
                                        }

                                        }
                                        // ao clicar no texto, tudo vai ser selecionado
                                        onFocus={(e) => e.target.select()}
                                        className="w-full text-7xl font-bold tracking-tighter text-center bg-transparent border-none outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        min="1"
                                        max="60"
                                        placeholder={location.pathname === '/TimerFocus' ? '25' : '5'}
                                    />
                                    <div className="text-muted-foreground text-[0.70rem] uppercase">
                                        Minutos
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => setInputMinutes(Number(inputMinutes + 1))}
                                    disabled={inputMinutes >= 99}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Aumentar</span>
                                </Button>
                            </div>

                            {errorMessage && (
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-destructive">{errorMessage}</p>
                                </div>
                            )}
                        </div>

                        <DrawerFooter>
                            <Button onClick={(e) => {

                                handleAlterMinutes(e);

                                {
                                    location.pathname === '/TimerFocus' &&
                                    toast("Período de Foco alterado foi com sucesso!", {
                                        description: `O tempo foi ajustado para ${inputMinutes} minutos`,
                                        className: "toast-custom",
                                        style: {
                                            border: '1px solid #00ff41',
                                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                            color: '#00ff41',
                                            boxShadow: '0 4px 12px rgba(0, 255, 65, 0.3)',
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
                                }
                                {
                                    location.pathname !== '/TimerFocus' &&
                                    toast("Período de Pausa alterado foi com sucesso!", {
                                        description: `O tempo foi ajustado para ${inputMinutes} minutos`,
                                        className: "toast-custom",
                                        style: {
                                            border: '1px solid #00ff41',
                                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                            color: '#00ff41',
                                            boxShadow: '0 4px 12px rgba(0, 255, 65, 0.3)',
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
                                }
                            }}>
                                Alterar Período
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

export default Timer