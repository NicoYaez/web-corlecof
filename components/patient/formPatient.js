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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Crear un Nuevo Paciente</h3>
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
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
              Rut:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="rut"
                id="rut"
                value={nuevoPaciente.rut}
                onChange={handleChange}
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
                value={nuevoPaciente.nombre}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidoPaterno">
             Apellido Paterno:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="apellidoPaterno"
                id="apellidoPaterno"
                value={nuevoPaciente.apellidoPaterno}
                onChange={handleChange}
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
                value={nuevoPaciente.apellidoMaterno}
                onChange={handleChange}
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
                value={nuevoPaciente.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          {/* Añade aquí el resto de tus campos de formulario */}
          <div className="items-center px-4 py-3">
            <button type="submit" className="mt-3 w-full inline-flex justify-center px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Crear Paciente
            </button>
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPatient;