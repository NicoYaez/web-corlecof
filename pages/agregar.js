import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Agregar.module.css';

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
        setShowAvailableUsers(true);
    };

    const handleAddParticipant = (usuarioId) => {
        setPacientesRUT(prevIds => [...prevIds, usuarioId]);
        console.log('Participant IDs:', [...pacientesRUT, usuarioId]);
    };

    const handleConfirmAddParticipants = async () => {
        try {
            console.log('Sending participant IDs:', pacientesRUT);
            const response = await axios.put(`${api}/taller/${tallerId}/assign-participants`, {
                pacientesRUT
            });
            console.log('Participantes agregados al taller:', response.data);

            // Actualizar la lista de participantes después de agregarlos
            const updatedTaller = await axios.get(`${api}/taller/${tallerId}`);
            console.log('Taller actualizado:', updatedTaller.data);
            setTaller(updatedTaller.data);

            // Limpiar los IDs de participantes después de confirmar
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
            setMessage(`Paciente eliminado exitosamente`);

            // Actualizar la lista de participantes después de eliminar
            const updatedTaller = await axios.get(`${api}/taller/${tallerId}`);
            console.log('Taller actualizado:', updatedTaller.data);
            setTaller(updatedTaller.data);
        } catch (error) {
            setMessage(`Error al eliminar paciente: ${error.response?.data?.message || error.message}`);
        }
    };

    if (loading || loadingUsuarios) {
        return <div>Cargando...</div>;
    }

    if (!taller) {
        return <div>No se encontró el taller.</div>;
    }

    // Filtrar usuarios disponibles que no están inscritos en el taller
    const usuariosDisponibles = usuarios.filter(usuario =>
        !taller.participants.some(participant => participant._id === usuario._id)
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestión de Taller: {taller.name}</h1>
            <p className={styles.info}>Profesional: {taller.profesional}</p>
            <p className={styles.info}>Inicio: {new Date(taller.startTime).toLocaleString()}</p>
            <p className={styles.info}>Fin: {new Date(taller.endTime).toLocaleString()}</p>
            <p className={styles.info}>Duración: {taller.duration} minutos</p>
            <p className={styles.info}>Descripción: {taller.description}</p>
            <p className={styles.info}>Tipo: {taller.type}</p>
            <p className={styles.info}>Participantes: {taller.participants.length}/{taller.maxParticipants}</p>

            <div>
                <h2 className={styles.title}>Participantes Registrados</h2>
                {taller.participants.length > 0 ? (
                    <ul className={styles.userList}>
                        {taller.participants.map(participant => (
                            <li key={participant._id} className={styles.userListItem}>
                                {participant.name} ({participant.rut})
                                <button className={styles.removeButton} onClick={() => handleEliminar(participant.rut)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.info}>No hay participantes registrados.</p>
                )}
            </div>

            {showAvailableUsers && (
                <div>
                    <h2 className={styles.title}>Lista de Usuarios Disponibles</h2>
                    <ul className={styles.userList}>
                        {usuariosDisponibles.map(usuario => (
                            <li key={usuario._id} className={styles.userListItem}>
                                {usuario.name} ({usuario.rut})
                                <button className={styles.addButton} onClick={() => handleAddParticipant(usuario.rut)}>Agregar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <input
                    type="text"
                    value={pacientesRUT.join(',')}
                    readOnly
                    className={styles.participantInput}
                />
                <button className={styles.submitButton} onClick={handleAddParticipants}>Mostrar Usuarios Disponibles</button>
                {showAvailableUsers && (
                    <button className={styles.confirmButton} onClick={handleConfirmAddParticipants}>Confirmar Participantes</button>
                )}
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default AgregarAlumno;
