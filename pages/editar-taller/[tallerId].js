import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/EditTaller.module.css'; // Importa los estilos CSS

const EditTaller = () => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const router = useRouter();
    const { tallerId } = router.query;
    const [taller, setTaller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        profesional: '',
        startTime: '',
        endTime: '',
        duration: '',
        participants: [],
        name: '',
        description: '',
        type: '',
        maxParticipants: ''
    });
    const [profesionales, setProfesionales] = useState([]);

    useEffect(() => {
        const fetchTaller = async () => {
            setLoading(true); // Indicar que se está cargando el taller
            try {
                const res = await axios.get(`${api}/taller/${tallerId}`);
                setTaller(res.data);
                setForm({
                    profesional: res.data.profesional || '',
                    startTime: res.data.startTime?.slice(0, 16) || '', // Asegurarse de que se maneje el formato de fecha según sea necesario
                    endTime: res.data.endTime?.slice(0, 16) || '', // Asegurarse de que se maneje el formato de fecha según sea necesario
                    duration: res.data.duration || '',
                    participants: res.data.participants.map(participant => participant._id),
                    name: res.data.name || '',
                    description: res.data.description || '',
                    type: res.data.type || '',
                    maxParticipants: res.data.maxParticipants || ''
                });
                setLoading(false); // Indicar que se ha completado la carga del taller
            } catch (error) {
                console.error('Error fetching taller:', error);
                setLoading(false); // Asegurarse de que se actualice el estado de carga en caso de error
            }
        };

        const fetchProfesionales = async () => {
            try {
                const response = await axios.get(`${api}/user/list/profesionales/Profesor`);
                setProfesionales(response.data);
            } catch (error) {
                console.error('Error fetching profesionales:', error);
            }
        };

        if (tallerId) {
            fetchTaller();
        }

        fetchProfesionales(); // Obtener la lista de profesionales al cargar el componente
    }, [api, tallerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si el taller se ha cargado correctamente
        if (!taller) {
            console.error('No se ha cargado el taller.');
            return;
        }

        try {
            const res = await axios.put(`${api}/taller/${tallerId}`, form);
            console.log('Taller actualizado:', res.data);
            router.push('/listtalleres'); // Redirigir a listtalleres.js después de la actualización
        } catch (error) {
            if (error.response) {
                console.error('Error de servidor:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                console.error('Error al configurar la solicitud:', error.message);
            }
            // Manejar el estado de error o mostrar un mensaje amigable al usuario
        }
    };

    if (loading) {
        return <div>Cargando taller...</div>;
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Editar Taller</h1>
                <label className={styles.label}>Profesional</label>
                <select
                    className={styles.input}
                    name="profesional"
                    value={form.profesional}
                    onChange={handleChange}
                >
                    <option value="">Selecciona un profesional</option>
                    {profesionales.map((profesional) => (
                        <option key={profesional.id} value={profesional.id}>
                            {profesional.name}
                        </option>
                    ))}
                </select>
                <label className={styles.label}>Fecha de inicio</label>
                <input className={styles.input} type="datetime-local" name="startTime" placeholder="Fecha de inicio" value={form.startTime} onChange={handleChange} />
                <label className={styles.label}>Fecha de término</label>
                <input className={styles.input} type="datetime-local" name="endTime" placeholder="Fecha de término" value={form.endTime} onChange={handleChange} />
                <label className={styles.label}>Duración</label>
                <input className={styles.input} type="number" name="duration" placeholder="Duración (en minutos)" value={form.duration} onChange={handleChange} />
                <label className={styles.label}>Nombre del taller</label>
                <input className={styles.input} type="text" name="name" placeholder="Nombre del taller" value={form.name} onChange={handleChange} />
                <label className={styles.label}>Descripción</label>
                <textarea className={styles.textarea} name="description" placeholder="Descripción" value={form.description} onChange={handleChange}></textarea>
                <label className={styles.label}>Tipo de taller</label>
                <input className={styles.input} type="text" name="type" placeholder="Tipo de taller" value={form.type} onChange={handleChange} />
                <label className={styles.label}>Máximo de participantes</label>
                <input className={styles.input} type="number" name="maxParticipants" placeholder="Máximo de participantes" value={form.maxParticipants} onChange={handleChange} />
                <button className={styles.button} type="submit">Actualizar Taller</button>
            </form>
        </div>
    );
};

export default EditTaller;
