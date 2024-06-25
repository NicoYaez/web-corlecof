import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PatientContext from '@/context/PatientContext';
function MedicalRecordForm({ patient, onClose }) {
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


        <div className="text-lg text-gray-700 font-semibold capitalize">
            <h2 class="text-lg text-gray-700 font-semibold capitalize">Crear Ficha Paciente</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <label className="text-gray-700" htmlFor="rut">
                        Rut:
                        <input
                            className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                            type="text"
                            name="rut"
                            id="rut"
                            value={datosPersonales.rut}
                            onChange={handleChange}
                            readOnly={datosPersonales.rut !== ''}
                            required
                        />
                    </label>
                    <label className="text-gray-700" htmlFor="nombre">
                        Nombre:
                        <input
                            className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
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
                    <label className="text-gray-700" htmlFor="apellidoPaterno">
                        Apellido Paterno:
                        <input
                            className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                            type="text"
                            name="apellidoPaterno"
                            id="apellidoPaterno"
                            value={datosPersonales.apellidoPaterno}
                            onChange={handleChange}
                            readOnly={datosPersonales.apellidoPaterno !== ''}
                            required
                        />
                    </label>
                    <label className="text-gray-700" htmlFor="apellidoMaterno">
                        Apellido Materno:
                        <input
                            className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                            type="text"
                            name="apellidoMaterno"
                            id="apellidoMaterno"
                            value={datosPersonales.apellidoMaterno}
                            onChange={handleChange}
                            readOnly={datosPersonales.apellidoMaterno !== ''}
                            required
                        />
                    </label>
                    <label className="text-gray-700" htmlFor="email">
                        Email:
                        <input
                            className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                            type="text"
                            name="email"
                            id="email"
                            value={datosPersonales.email}
                            onChange={handleChange}
                            readOnly={datosPersonales.email !== ''}
                            required
                        />
                    </label>
                    <label className="text-gray-700" htmlFor="edad">
                        Edad:
                        <input
                            className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                            type="text"
                            name="edad"
                            id="edad"
                            value={fichaMedica.edad}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="flex justify-end mt-4">

                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>

    );
}

export default MedicalRecordForm;
