// context/PatientContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const api = process.env.NEXT_PUBLIC_API_LINK;
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    const fetchPatients = () => {
      axios.get(`${api}/paciente/list`)
        .then(response => {
          setPatientsList(response.data);
        })
        .catch(error => console.error('Error al obtener los pacientes:', error));
    };

    fetchPatients();
    const intervalId = setInterval(fetchPatients, 10000);

    return () => clearInterval(intervalId);
  }, [api]);

  const refreshPatients = () => {
    axios.get(`${api}/paciente/list`)
      .then(response => {
        setPatientsList(response.data);
      })
      .catch(error => console.error('Error al actualizar los pacientes:', error));
  };
  const deletePatient = (patientId) => {
    axios.delete(`${api}/paciente/delete/${patientId}`)
      .then(() => {
        refreshPatients(); // Actualiza la lista de pacientes después de eliminar
      })
      .catch(error => console.error('Error al eliminar el paciente:', error));
  };

  return (
    <PatientContext.Provider value={{ patientsList, refreshPatients, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
