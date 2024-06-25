import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PatientContext from '@/context/PatientContext';
function MedicalRecordForm({ patient, onClose}) {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const { refreshPatients } = useContext(PatientContext);

    const [datosPersonales, setDatosPersonales] = useState({
        rut: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
    });

    const [fichaMedica, setFichaMedica] = useState({
        paciente: '',
        edad: '',
        estadoFicha: true,
    });

    useEffect(() => {
        if (patient) {
            setDatosPersonales({
                rut: patient.rut,
                nombre: patient.nombre,
                apellidoPaterno: patient.apellidoPaterno,
                apellidoMaterno: patient.apellidoMaterno,
                email: patient.email,
            });
            setFichaMedica(prevState => ({
                ...prevState,
                paciente: patient._id,
            }));
        }
    }, [patient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in datosPersonales) {
            setDatosPersonales(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            setFichaMedica(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/ficha/paciente/add`, fichaMedica);
            if (response.status !== 200) {
                throw new Error('Error en la creación de la ficha médica del paciente');
            }

            const response2 = await axios.put(`${api}/paciente/?id=${patient._id}&fichaMedica=true`);
            if (response2.status !== 200) {
                throw new Error('Error al cambiar el estado de la ficha médica del paciente');
            }

            alert('Ficha creada con éxito');
            refreshPatients();
            onClose();
        } catch (error) {
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
                    Rut:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="rut"
                        id="rut"
                        value={datosPersonales.rut}
                        onChange={handleChange}
                        readOnly={datosPersonales.rut !== ''}
                        required
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={datosPersonales.nombre}
                        onChange={handleChange}
                        readOnly={datosPersonales.nombre !== ''}
                        required
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidoPaterno">
                    Apellido Paterno:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="apellidoPaterno"
                        id="apellidoPaterno"
                        value={datosPersonales.apellidoPaterno}
                        onChange={handleChange}
                        readOnly={datosPersonales.apellidoPaterno !== ''}
                        required
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidoMaterno">
                    Apellido Materno:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="apellidoMaterno"
                        id="apellidoMaterno"
                        value={datosPersonales.apellidoMaterno}
                        onChange={handleChange}
                        readOnly={datosPersonales.apellidoMaterno !== ''}
                        required
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="email"
                        id="email"
                        value={datosPersonales.email}
                        onChange={handleChange}
                        readOnly={datosPersonales.email !== ''}
                        required
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
                    Edad:
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="edad"
                        id="edad"
                        value={fichaMedica.edad}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <br />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Enviar
            </button>
            <button
                onClick={onClose}
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
                Cancelar
            </button>
        </form>
    );
}

export default MedicalRecordForm;
