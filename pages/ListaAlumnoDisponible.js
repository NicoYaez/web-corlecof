// ListaAlumnosDisponibles.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/ListaAlumnosDisponibles.module.css'; // Estilos para esta página

const ListaAlumnosDisponibles = () => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const [usuarios, setUsuarios] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);
    const [participantIds, setParticipantIds] = useState('');
    const [tallerId, setTallerId] = useState(''); // Asegúrate de obtener el tallerId de alguna manera

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get(`${api}/paciente/list`);
                setUsuarios(res.data);
                setLoadingUsuarios(false);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
                setLoadingUsuarios(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleInscribirAlumno = async () => {
        try {
            const response = await axios.put(`${api}/taller/${tallerId}/assign-participants`, {
                participantIds: participantIds.split(',')
            });
            console.log('Participantes agregados al taller:', response.data);
            // Redireccionar a la página del taller o mostrar mensaje de éxito
        } catch (error) {
            console.error('Error al inscribir participantes:', error);
        }
    };

    if (loadingUsuarios) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista de Alumnos Disponibles</h1>
            <ul className={styles.userList}>
                {usuarios.map(usuario => (
                    <Link legacyBehavior key={usuario._id} className={styles.userListItem}>
                        {usuario.name} ({usuario.email})
                        <button className={styles.addButton} onClick={() => setParticipantIds(prevIds => prevIds ? `${prevIds},${usuario._id}` : `${usuario._id}`)}>Inscribir</button>
                    </Link>
                ))}
            </ul>
            <Link legacyBehavior href={`/talleres/[tallerId]`} as={`/talleres/${tallerId}`}>
                <a className={styles.confirmButton} onClick={handleInscribirAlumno}>Confirmar Inscripción</a>
            </Link>
        </div>
    );
};

export default ListaAlumnosDisponibles;
