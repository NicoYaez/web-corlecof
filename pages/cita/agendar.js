import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarCita = () => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const [profesionales, setProfesionales] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [horasOcupadas, setHorasOcupadas] = useState([]);

    useEffect(() => {
        fetchProfesionales();
        fetchPacientes();
    }, []);

    useEffect(() => {
        if (profesionalSeleccionado && fecha) {
            fetchHorasOcupadasPorProfesionalYFecha(profesionalSeleccionado, fecha);
        }
    }, [profesionalSeleccionado, fecha]);

    const fetchProfesionales = async () => {
        try {
            const response = await axios.get(`${api}/user/list/profesionales`);
            setProfesionales(response.data);
        } catch (error) {
            console.error('Error fetching profesionales:', error);
        }
    };

    const fetchPacientes = async () => {
        try {
            const response = await axios.get(`${api}/paciente/list`);
            setPacientes(response.data);
        } catch (error) {
            console.error('Error fetching pacientes:', error);
        }
    };

    const fetchHorasOcupadasPorProfesionalYFecha = async (profesionalId, fecha) => {
        try {
            const response = await axios.get(`${api}/hora/ocupadas/${profesionalId}/${fecha}`);
            setHorasOcupadas(response.data.horasOcupadas || []);
        } catch (error) {
            console.error('Error fetching horas ocupadas:', error);
        }
    };

    console.log(horasOcupadas)

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar si la hora seleccionada está ocupada
        const horaCompleta = `${fecha} ${hora}`;
        if (horasOcupadas.includes(horaCompleta)) {
            setMensajeError('La hora seleccionada ya está ocupada. Por favor, selecciona otra hora.');
            return;
        }

        try {
            const response = await axios.post(`${api}/hora/add`, {
                profesionalId: profesionalSeleccionado,
                pacienteId: pacienteSeleccionado,
                fecha,
                hora
            });

            console.log('Cita médica creada:', response.data);
            // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito

            // Limpiar el formulario después de enviar
            setProfesionalSeleccionado('');
            setPacienteSeleccionado('');
            setFecha('');
            setHora('');
            setMensajeError('');
        } catch (error) {
            if (error.response) {
                setMensajeError(error.response.data.message);
            } else {
                console.error('Error al crear la cita médica:', error.message);
            }
        }
    };

    const handleFilterByEspecialidad = async (especialidad) => {
        try {
            const response = await axios.get(`${api}/user/list/profesionales/${especialidad}`);
            setProfesionales(response.data);
            setProfesionalSeleccionado(''); // Limpiar la selección al filtrar por especialidad
        } catch (error) {
            console.error(`Error fetching ${especialidad} profesionales:`, error);
        }
    };

    useEffect(() => {
        if (fecha) {
            const horas = generarHorasTotales();
            setHorasDisponibles(horas);
        }
    }, [fecha, horasOcupadas]);

    const generarHorasTotales = () => {
        const horas = [];
        for (let hora = 8; hora < 18; hora++) {
            for (let minuto = 0; minuto < 60; minuto += 30) {
                const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
                const horaCompleta = `${fecha} ${horaFormateada}`;
                const horaOcupada = horasOcupadas.includes(horaCompleta);
                if (hora > 8 || (hora === 8 && minuto >= 30)) {
                    if (!horaOcupada) {
                        horas.push(horaFormateada);
                    }
                }
            }
        }
        return horas;
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Agregar Cita Médica</h1>
            {mensajeError && <p className="text-red-500 mb-4">{mensajeError}</p>}
            <div className="flex flex-wrap mb-4">
                <button
                    className="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-indigo-500 hover:text-white"
                    onClick={() => handleFilterByEspecialidad('Medico')}
                >
                    Medico
                </button>
                <button
                    className="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-indigo-500 hover:text-white"
                    onClick={() => handleFilterByEspecialidad('Kinesiologo')}
                >
                    Kinesiologo
                </button>
                <button
                    className="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-indigo-500 hover:text-white"
                    onClick={() => handleFilterByEspecialidad('Nutricionista')}
                >
                    Nutricionista
                </button>
                <button
                    className="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-indigo-500 hover:text-white"
                    onClick={() => handleFilterByEspecialidad('Profesor')}
                >
                    Profesor
                </button>
                <button
                    className="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-indigo-500 hover:text-white"
                    onClick={() => handleFilterByEspecialidad('Psicologo')}
                >
                    Psicologo
                </button>
                <button
                    className="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-lr-0 ml-0 rounded-l hover:bg-indigo-500 hover:text-white"
                    onClick={() => fetchProfesionales()}
                >
                    Mostrar Todos
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Profesional:</label>
                    <select
                        className="w-full px-3 py-2 border rounded-lg"
                        value={profesionalSeleccionado}
                        onChange={(e) => setProfesionalSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un profesional</option>
                        {profesionales.map((profesional) => (
                            <option key={profesional._id} value={profesional._id}>{profesional.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Paciente:</label>
                    <select
                        className="w-full px-3 py-2 border rounded-lg"
                        value={pacienteSeleccionado}
                        onChange={(e) => setPacienteSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un paciente</option>
                        {pacientes.map((paciente) => (
                            <option key={paciente._id} value={paciente._id}>{paciente.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Fecha:</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Hora:</label>
                    <select
                        className="w-full px-3 py-2 border rounded-lg"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una hora</option>
                        {horasDisponibles.map((horaDisponible) => (
                            <option key={horaDisponible} value={horaDisponible}>
                                {horaDisponible}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3">
                    Crear Cita Médica
                </button>
            </form>
        </div>
    );
};

export default AgregarCita;