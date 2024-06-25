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
        <div>
            <div className='mt-8'>
                <div className='text-center w-full'>
                    <h1 className="text-gray-600 text-lg">Lista de Talleres</h1>
                </div>
                <div className="flex flex-col mt-6">
                    <div className="align-middle min-w-full  ">
                        <table className="w-3/4 mx-auto">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Profesional</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Inicio Taller</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Fin Taller</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Participantes</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {talleres.map(taller => (
                                    <tr key={taller._id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{taller.name}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{taller.profesional}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(taller.startTime).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(taller.endTime).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"> {taller.duration} minutos</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{taller.description}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{taller.type}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{taller.participants.length}/{taller.maxParticipants}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex flex-row space-x-1">
                                                <Link legacyBehavior href={`/talleres/editar-taller/${taller._id}`}>
                                                    <a className="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3">Editar Taller</a>
                                                </Link>
                                                <Link legacyBehavior href={`/talleres/agregar?tallerId=${taller._id}`}>
                                                    <a className="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3">Agregar Alumno</a>
                                                </Link>
                                                <button onClick={() => handleDelete(taller._id)} className="px-6 py-3 bg-red-600 rounded-md text-white font-medium tracking-wide hover:bg-red-500 ml-3">Eliminar Taller</button>
                                            </div>
                                        </td>
                                    </tr>






                                ))}

                            </tbody>
                        </table>
                        <div className='mt-4 text-center py-5'>

                        <Link legacyBehavior href="/talleres/crear-taller">
                            <a className="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3">Crear nuevo taller</a>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListTalleres;
