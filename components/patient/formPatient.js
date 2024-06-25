import React, { useState, useContext } from 'react';
import axios from 'axios';
import PatientContext from '@/context/PatientContext';

const FormPatient = ({ onClose }) => {
  const api = process.env.NEXT_PUBLIC_API_LINK;
  const { refreshPatients } = useContext(PatientContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/paciente/add`, nuevoPaciente);

      if (response.status !== 200) {
        throw new Error('Error en la creación del paciente');
      }

      const result = response.data;
      alert('Paciente creado con éxito: ');
      refreshPatients();
      onClose();

    } catch (error) {
      alert('Error al crear el paciente: ' + error.message);
    }
  };



  const [nuevoPaciente, setDatosPersonales] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    edad: '',
    fichasMedica: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg text-gray-700 font-semibold capitalize">Crear un Nuevo Paciente</h3>
          <div className="mt-2">
            <button
              onClick={onClose} // Llama a onClose cuando se hace clic en el botón
              className="absolute top-0 right-0 m-4 text-black"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <label className="text-gray-700" htmlFor="rut">
              Rut:
              <input
                className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                type="text"
                name="rut"
                id="rut"
                value={nuevoPaciente.rut}
                onChange={handleChange}
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
                value={nuevoPaciente.nombre}
                onChange={handleChange}
                required
              />
            </label>
            <label className="text-gray-700" htmlFor="apellidoPaterno">
             Apellido Paterno:
              <input
                className="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                type="text"
                name="apellidoPaterno"
                id="apellidoPaterno"
                value={nuevoPaciente.apellidoPaterno}
                onChange={handleChange}
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
                value={nuevoPaciente.apellidoMaterno}
                onChange={handleChange}
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
                value={nuevoPaciente.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          {/* Añade aquí el resto de tus campos de formulario */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Crear Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPatient;