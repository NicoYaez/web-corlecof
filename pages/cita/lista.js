import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const [especialidad, setEspecialidad] = useState('');
    const [profesionales, setProfesionales] = useState([]);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [citaIdParaEditar, setCitaIdParaEditar] = useState(null);

    const especialidadesValidas = ['Medico', 'Kinesiologo', 'Nutricionista', 'Profesor', 'Psicologo'];

    useEffect(() => {
        // Cargar citas al seleccionar un profesional
        if (profesionalSeleccionado) {
            fetchCitas(profesionalSeleccionado);
        }
    }, [profesionalSeleccionado]);

    const handleEspecialidadChange = (e) => {
        setEspecialidad(e.target.value);
    };

    const handleFilterByEspecialidad = async (especialidad) => {
        try {
            const response = await axios.get(`${api}/user/list/profesionales/${especialidad}`);
            setProfesionales(response.data);
            setProfesionalSeleccionado(''); // Limpiar la selección al filtrar por especialidad
            setCitas([]); // Limpiar las citas al cambiar la especialidad
        } catch (error) {
            console.error(`Error fetching ${especialidad} profesionales:`, error);
        }
    };

    const fetchCitas = async (idProfesional) => {
        try {
            setLoading(true);
            const response = await axios.get(`${api}/hora/ocupadas/${idProfesional}`);
            setCitas(response.data.citas); // Actualizar el estado con las citas del profesional
        } catch (error) {
            console.error('Error al obtener las citas:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log(citas)

    const handleEliminarCita = async (idCita) => {
        try {
            const response = await axios.delete(`${api}/hora/delete/${idCita}`);
            // Refrescar la lista de citas después de eliminar
            await fetchCitas(profesionalSeleccionado);
            console.log('Cita eliminada correctamente:', response.data);
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
        }
    };

    const handleEditarEstadoCita = (idCita) => {
        setCitaIdParaEditar(idCita); // Guardar el ID de la cita que se va a editar
        setEstadoSeleccionado(''); // Limpiar el estado seleccionado inicialmente
        setShowEditForm(true); // Mostrar el formulario de edición
    };

    const handleSubmitEditarEstado = async (e) => {
        e.preventDefault();
        if (!citaIdParaEditar) {
            console.error('Cita ID no está definida');
            return;
        }
        try {
            const response = await axios.put(`${api}/hora/update/${citaIdParaEditar}`, { estado: estadoSeleccionado });
            const updatedCitas = citas.map(cita => cita._id === citaIdParaEditar ? { ...cita, status: estadoSeleccionado } : cita);
            setCitas(updatedCitas);
            console.log('Estado de cita actualizado correctamente:', response.data);
            setShowEditForm(false); // Ocultar el formulario después de la edición
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error);
        }
    };

    const buscarCitas = (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado de recarga de página
        if (profesionalSeleccionado) {
            fetchCitas(profesionalSeleccionado);
        } else {
            alert('Por favor, selecciona un profesional primero.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Buscador de Citas</h1>
            <div className="flex flex-wrap mb-4">
                {especialidadesValidas.map((esp, index) => (
                    <button
                        key={index}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2 hover:bg-blue-600 focus:outline-none"
                        onClick={() => handleFilterByEspecialidad(esp)}
                    >
                        {esp}
                    </button>
                ))}
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 mb-2 hover:bg-gray-600 focus:outline-none"
                    onClick={() => handleFilterByEspecialidad('')}
                >
                    Mostrar Todos
                </button>
            </div>
            <form className="space-y-4">
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
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                    onClick={(e) => buscarCitas(e.target.value)} // Pasar el evento al manejador
                    disabled={!profesionalSeleccionado || loading}
                >
                    {loading ? 'Cargando...' : 'Buscar Citas'}
                </button>
            </form>

            {citas.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Citas del Profesional:</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Fecha</th>
                                    <th className="border border-gray-300 px-4 py-2">Hora</th>
                                    <th className="border border-gray-300 px-4 py-2">Paciente</th>
                                    <th className="border border-gray-300 px-4 py-2">Estado</th>
                                    <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {citas.map((cita) => (
                                    <tr key={cita._id}>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(cita.fecha).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{cita.hora}</td>
                                        <td className="border border-gray-300 px-4 py-2">{cita.paciente.nombre} {cita.paciente.apellidoPaterno}</td>
                                        <td className="border border-gray-300 px-4 py-2">{cita.status}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded focus:outline-none"
                                                onClick={() => handleEliminarCita(cita._id)}
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded ml-2 focus:outline-none"
                                                onClick={() => handleEditarEstadoCita(cita._id)}
                                            >
                                                Editar Estado
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Formulario de edición de estado */}
            {showEditForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Editar Estado de Cita</h2>
                        <form onSubmit={handleSubmitEditarEstado}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Estado:</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-lg"
                                    value={estadoSeleccionado}
                                    onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                >
                                    <option value="">Selecciona un estado</option>
                                    <option value="Programada">Programada</option>
                                    <option value="Completada">Completada</option>
                                    <option value="Cancelada">Cancelada</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 focus:outline-none"
                                    onClick={() => setShowEditForm(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
