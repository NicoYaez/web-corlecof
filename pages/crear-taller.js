import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Taller.module.css';

const CreateTaller = () => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
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

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${api}/taller/register`, form);

            if (res.status !== 200) {
                throw new Error('Error al crear el taller');
            }

            const data = res.data;
            console.log('Taller creado:', data);
            setMessage('Taller creado correctamente');
        } catch (error) {
            console.error(error.message);
            setMessage('Error al crear el taller');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Crear Taller</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>Profesional</label>
                <input className={styles.input} type="text" name="profesional" placeholder="Profesional" value={form.profesional} onChange={handleChange} />
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
                <button className={styles.button} type="submit">Crear Taller</button>
            </form>
            {message && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md border border-red-300 rounded">
                <div className="bg-red-50 py-3 px-3 sm:px-6 sm:rounded-md sm:px-10">
                    <p className="text-sm text-gray-600 text-center">{message}</p>
                </div>
            </div>}
        </div>
    );
};

const Talleres = () => {
    return (
        <div className={styles.container}>
            <CreateTaller />
        </div>
    );
};

export default Talleres;


