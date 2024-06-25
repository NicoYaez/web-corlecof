import React, { useState, useContext } from 'react';
import axios from 'axios';
import PatientContext from '@/context/PatientContext';



const EditPatientModal = ({ onClose, patient }) => {
  const api = process.env.NEXT_PUBLIC_API_LINK;
  const { refreshPatients } = useContext(PatientContext);
  const patientSafe = patient || { rut: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', email: '' };

  const [pacienteEditar, setPacienteEditar] = useState({
    rut: patientSafe.rut,
    nombre: patientSafe.nombre,
    apellidoPaterno: patientSafe.apellidoPaterno,
    apellidoMaterno: patientSafe.apellidoMaterno,
    email: patientSafe.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacienteEditar(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${api}/paciente//?id=`+ patientSafe._id + `&rut=`+ pacienteEditar.rut + `&nombre=`+ pacienteEditar.nombre +
        `&apellidoPaterno=`+ pacienteEditar.apellidoPaterno + `&apellidoMaterno=`+ pacienteEditar.apellidoMaterno + `&email=` + pacienteEditar.email); // Asegúrate de reemplazar 'tu_api' con la URL de tu API
      if (response.status === 200) {
        alert('Paciente actualizado correctamente');
        refreshPatients();
        onClose();
      } else {
        throw new Error('Error al actualizar el paciente');
      }
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías manejar el error de manera adecuada, como mostrando un mensaje al usuario
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Paciente</h3>
          <div className="mt-2">
            <button onClick={onClose} className="absolute top-0 right-0 m-4 text-black">
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
                value={pacienteEditar.rut}
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
                value={pacienteEditar.nombre}
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
                value={pacienteEditar.apellidoPaterno}
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
                value={pacienteEditar.apellidoMaterno}
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
                value={pacienteEditar.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Guardar Cambios
            </button>
            <button onClick={onClose} type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
