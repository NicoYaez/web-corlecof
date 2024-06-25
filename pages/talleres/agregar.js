import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const AgregarAlumno = () => {
    const router = useRouter();
    const { tallerId } = router.query;
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const [taller, setTaller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pacientesRUT, setPacientesRUT] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);
    const [showAvailableUsers, setShowAvailableUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTaller = async () => {
            try {
                const res = await axios.get(`${api}/taller/${tallerId}`);
                console.log('Taller fetched:', res.data);
                setTaller(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching taller:', error);
                setLoading(false);
            }
        };

        if (tallerId) {
            fetchTaller();
        } else {
            setLoading(false);
        }
    }, [tallerId]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get(`${api}/paciente/list`);
                console.log('Usuarios fetched:', res.data);
                setUsuarios(res.data);
                setLoadingUsuarios(false);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
                setLoadingUsuarios(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleAddParticipants = () => {
        setShowAvailableUsers(!showAvailableUsers);
        if (!showAvailableUsers) {
            setFilteredUsuarios(usuarios);
        }
    };

    const handleAddParticipant = (usuarioRUT) => {
        setPacientesRUT(prevRUTs => [...prevRUTs, usuarioRUT]);
        console.log('Participant RUTs:', [...pacientesRUT, usuarioRUT]);
    };

    const handleConfirmAddParticipants = async () => {
        try {
            console.log('Sending participant RUTs:', pacientesRUT);
            const response = await axios.put(`${api}/taller/${tallerId}/assign-participants`, {
                pacientesRUT
            });
            console.log('Participantes agregados al taller:', response.data);

            const updatedTaller = await axios.get(`${api}/taller/${tallerId}`);
            console.log('Taller actualizado:', updatedTaller.data);
            setTaller(updatedTaller.data);

            setPacientesRUT([]);
            setShowAvailableUsers(false);
        } catch (error) {
            console.error('Error al agregar participantes:', error);
        }
    };

    const handleEliminar = async (pacienteRUT) => {
        try {
            const response = await axios.delete(`${api}/taller/${tallerId}/remove-paciente`, {
                data: { pacienteRUT }
            });

            const updatedTaller = await axios.get(`${api}/taller/${tallerId}`);
            console.log('Taller actualizado:', updatedTaller.data);
            setTaller(updatedTaller.data);
        } catch (error) {
            setMessage(`Error al eliminar paciente: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleRemoveParticipant = (rut) => {
        setPacientesRUT(prevRUTs => prevRUTs.filter(item => item !== rut));
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = usuarios.filter(usuario =>
            usuario.rut.includes(value)
        );
        setFilteredUsuarios(filtered);
    };

    if (loading || loadingUsuarios) {
        return <div className="container mx-auto">Cargando...</div>;
    }

    if (!taller) {
        return <div className="container mx-auto">No se encontró el taller.</div>;
    }

    const usuariosDisponibles = filteredUsuarios.filter(usuario =>
        !taller.participants.some(participant => participant.rut === usuario.rut)
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Gestión de Taller: {taller.name}</h1>
            <p className="mb-2"><span className="font-semibold">Profesional:</span> {taller.profesional}</p>
            <p className="mb-2"><span className="font-semibold">Inicio:</span> {new Date(taller.startTime).toLocaleString()}</p>
            <p className="mb-2"><span className="font-semibold">Fin:</span> {new Date(taller.endTime).toLocaleString()}</p>
            <p className="mb-2"><span className="font-semibold">Duración:</span> {taller.duration} minutos</p>
            <p className="mb-2"><span className="font-semibold">Descripción:</span> {taller.description}</p>
            <p className="mb-2"><span className="font-semibold">Tipo:</span> {taller.type}</p>
            <p className="mb-4"><span className="font-semibold">Participantes:</span> {taller.participants.length}/{taller.maxParticipants}</p>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Participantes Registrados</h2>
                {taller.participants.length > 0 ? (
                    <ul>
                        {taller.participants.map(participant => (
                            <li key={participant.rut} className="flex items-center justify-between mb-2">
                                <span>{participant.nombre} {participant.apellidoPaterno} {participant.apellidoMaterno} ({participant.rut})</span>
                                <button onClick={() => handleEliminar(participant.rut)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="italic">No hay participantes registrados.</p>
                )}
            </div>

            <div className="mb-4">
                <button onClick={handleAddParticipants} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                    {showAvailableUsers ? 'Ocultar Usuarios Disponibles' : 'Mostrar Usuarios Disponibles'}
                </button>
                {showAvailableUsers && (
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar por RUT"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border border-gray-300 rounded px-3 py-2 mb-2"
                        />
                        <ul>
                            {usuariosDisponibles.map(usuario => (
                                <li key={usuario.rut} className="flex items-center justify-between mb-2">
                                    <span>{usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno} ({usuario.rut})</span>
                                    <button onClick={() => handleAddParticipant(usuario.rut)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Agregar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <ul>
                    {pacientesRUT.map(rut => (
                        <li key={rut} className="flex items-center justify-between mb-2">
                            <span>{rut}</span>
                            <button onClick={() => handleRemoveParticipant(rut)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                        </li>
                    ))}
                </ul>
                {showAvailableUsers && (
                    <button onClick={handleConfirmAddParticipants} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Confirmar Participantes
                    </button>
                )}
            </div>

            {message && <p className="text-red-500">{message}</p>}

            <Link legacyBehavior href="/talleres/list-talleres">
                <a className="text-blue-500 hover:underline">Volver a Listado de Talleres</a>
            </Link>
        </div>
    );
};

export default AgregarAlumno;
