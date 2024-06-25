import React, { useContext, useState } from 'react';
import PatientContext from '../../context/PatientContext';
import MedicalRecordModal from '../fichaMedica/modelFichaMedica';
import EditPatientModal from './patienFormEdit';

const PatientList = () => {
  const { patientsList, deletePatient } = useContext(PatientContext);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);

  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setIsMedicalRecordModalOpen(true); // Cambiado a setIsMedicalRecordModalOpen para abrir el modal de ficha médica
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
      deletePatient(patientId);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">RUT</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">Nombre</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">Apellido Paterno</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">Apellido Materno</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">Correo Electrónico</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">Ficha Médica</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">Edición</th>
          </tr>
        </thead>
        <tbody>
          {patientsList.map((patient) => (
            <tr key={patient._id} className="border-b">
              <td className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">{patient.rut}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">{patient.nombre}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">{patient.apellidoPaterno}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">{patient.apellidoMaterno}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">{patient.email}</td>
              <td className="px-2 py-2 sm:px-4 sm:py-2 text-center align-middle">
                <button
                  className={`${patient.fichaMedica ? 'bg-green-500' : 'bg-red-500'} text-white py-1 px-2 rounded focus:outline-none`}
                  onClick={() => handleOpenModal(patient)}
                >
                  {patient.fichaMedica ? 'Existe' : 'No Existe'}
                </button>
              </td>
              <td className="text-center">
                <button onClick={() => handleEditPatient(patient)}><i className="icono-editar">✏️</i></button>
                <button onClick={() => handleDeletePatient(patient._id)}><i className="icono-eliminar">🗑️</i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isMedicalRecordModalOpen && (
        <MedicalRecordModal
          patient={selectedPatient}
          onClose={() => setIsMedicalRecordModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PatientList;
