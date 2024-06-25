import React, { useState, useEffect } from 'react';
import MedicalRecordForm from './medicalRecordForm';
import PatientData from '../patient/patientData';

function MedicalRecordModal({ patient, onClose }) { // Asume que onClose es una prop para manejar el cierre del modal
  const [currentPatient, setCurrentPatient] = useState(patient);

  useEffect(() => {
    setCurrentPatient(patient);
  }, [patient]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={onClose} // Llama a onClose cuando se hace clic en el botón
          className="absolute top-0 right-0 m-4 text-black"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {!currentPatient.fichaMedica ? (
          <MedicalRecordForm patient={currentPatient} />
        ) : (
          <PatientData patient={currentPatient} />
        )}
      </div>
    </div>
  );
}

export default MedicalRecordModal;