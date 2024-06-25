import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_LINK;

const especialidadesValidas = ['Medico', 'Kinesiologo', 'Nutricionista', 'Profesor', 'Psicologo'];

const AddProfessionalPage = () => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [especialidad, setEspecialidad] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, {
                rut,
                name: nombre,
                email,
                role: 'Profesional',
                speciality: especialidad
            });

            if (response.status === 200) {
                alert('Profesional agregado exitosamente');
                setRut('');
                setNombre('');
                setEmail('');
                setEspecialidad('');
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error al agregar profesional:', error);
            alert('Error interno del servidor');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Agregar Profesional</title>
                <meta name="description" content="Agregar un nuevo profesional" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md mt-20">
                <h1 className="text-2xl font-bold mb-6 text-center">Agregar Profesional</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Rut:
                        </label>
                        <input
                            type="text"
                            value={rut}
                            onChange={(e) => setRut(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Especialidad:
                        </label>
                        <select
                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccione una especialidad</option>
                            {especialidadesValidas.map((esp, index) => (
                                <option key={index} value={esp}>{esp}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Agregar Profesional
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddProfessionalPage;
