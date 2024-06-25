import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../styles/ListTalleres.module.css';

const ListTalleres = () => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const [talleres, setTalleres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTalleres = async () => {
            try {
                const res = await axios.get(`${api}/taller/list`);
                setTalleres(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching talleres:', error);
                setLoading(false);
            }
        };

        fetchTalleres();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${api}/taller/delete/${id}`);
            setTalleres(talleres.filter(taller => taller._id !== id));
        } catch (error) {
            console.error('Error deleting taller:', error);
        }
    };

    if (loading) {
        return <div>Cargando talleres...</div>;
    }

    return (
        <div className={styles.container}>
            <Link legacyBehavior href="/talleres/crear-taller">
                <a className={styles.createButton}>Crear nuevo taller</a>
            </Link>
            <h1>Lista de Talleres</h1>
            <ul className={styles.list}>
                {talleres.map(taller => (
                    <li key={taller._id} className={styles.listItem}>
                        <h2>{taller.name}</h2>
                        <p>Profesional: {taller.profesional}</p>
                        <p>Inicio: {new Date(taller.startTime).toLocaleString()}</p>
                        <p>Fin: {new Date(taller.endTime).toLocaleString()}</p>
                        <p>Duración: {taller.duration} minutos</p>
                        <p>Descripción: {taller.description}</p>
                        <p>Tipo: {taller.type}</p>
                        <p>Participantes: {taller.participants.length}/{taller.maxParticipants}</p>
                        <div className={styles.buttonContainer}>
                            <Link legacyBehavior href={`/talleres/editar-taller/${taller._id}`}>
                                <a>Editar Taller</a>
                            </Link>
                            <Link legacyBehavior href={`/talleres/agregar?tallerId=${taller._id}`}>
                                <a className={styles.button}>Agregar Alumno</a>
                            </Link>
                            <button onClick={() => handleDelete(taller._id)} className={styles.deleteButton}>Eliminar Taller</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListTalleres;
