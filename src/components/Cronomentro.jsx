

const Cronomentro = ({ horas, minutes, seconds, iniciar }) => {
    return (
        <div>
            {/* padStart faz com que seconds sem seja exibido com dois digitos */}
            <p>{horas}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
            <button onClick={iniciar}>Iniciar</button>
        </div>
    )
}

export default Cronomentro