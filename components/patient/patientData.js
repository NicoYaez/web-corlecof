import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DatosPersonales({ patient }) {
  const api = process.env.NEXT_PUBLIC_API_LINK;
  const [currentPatient, setCurrentPatient] = useState(patient);
  const [fichaMedica, setFichaMedica] = useState();


  useEffect(() => {
    // Función asíncrona anónima para usar await
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/ficha/paciente/?id=` + currentPatient._id);
        setFichaMedica(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    fetchData();
  }, [api, currentPatient._id]); // De

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5">
      <h2 className="text-lg font-semibold text-gray-900">Fichas Personal</h2>
      {fichaMedica && fichaMedica.paciente ? (
        <div className="mt-2">
          <p className="text-md text-gray-700"><strong>Nombre:</strong> {fichaMedica.paciente.nombre}</p>
          <p className="text-md text-gray-700"><strong>Apellido Paterno:</strong> {fichaMedica.paciente.apellidoPaterno}</p>
          <p className="text-md text-gray-700"><strong>Apellido Materno:</strong> {fichaMedica.paciente.apellidoMaterno}</p>
          <p className="text-md text-gray-700"><strong>Email:</strong> {fichaMedica.paciente.email}</p>
          <p className="text-md text-gray-700"><strong>Edad:</strong> {fichaMedica.edad}</p>
        </div>
      ) : (
        <p className="text-gray-700">Cargando datos del paciente...</p>
      )}
    </div>
  );
}

export default DatosPersonales;