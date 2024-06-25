import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
        <div className="container mx-auto p-4">
            <Link legacyBehavior href="/talleres/crear-taller">
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                    Crear nuevo taller
                </a>
            </Link>
            <h1 className="text-3xl font-bold mb-4">Lista de Talleres</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Profesional</th>
                            <th className="border border-gray-300 px-4 py-2">Inicio</th>
                            <th className="border border-gray-300 px-4 py-2">Fin</th>
                            <th className="border border-gray-300 px-4 py-2">Duración (minutos)</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Tipo</th>
                            <th className="border border-gray-300 px-4 py-2">Participantes</th>
                            <th className="border border-gray-300 px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talleres.map(taller => (
                            <tr key={taller._id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{taller.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{taller.profesional}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(taller.startTime).toLocaleString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(taller.endTime).toLocaleString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{taller.duration}</td>
                                <td className="border border-gray-300 px-4 py-2">{taller.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{taller.type}</td>
                                <td className="border border-gray-300 px-4 py-2">{taller.participants.length}/{taller.maxParticipants}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="space-x-2">
                                        <Link legacyBehavior href={`/talleres/editar-taller/${taller._id}`}>
                                            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Editar</a>
                                        </Link>
                                        <Link legacyBehavior href={`/talleres/agregar?tallerId=${taller._id}`}>
                                            <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Agregar Alumno</a>
                                        </Link>
                                        <button onClick={() => handleDelete(taller._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTalleres;
