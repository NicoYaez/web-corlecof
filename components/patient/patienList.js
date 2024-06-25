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
    
    <div>

    <h3 className="text-gray-700 text-3xl font-medium py-5 text-center">Pacientes Inscritos</h3>
    


    <div className="mt-6">
      <div className="bg-white shadow rounded-md overflow-hidden my-6">
        <table className="text-left w-full border-collapse">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">RUT</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Apellido Paterno</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Apellido Materno</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ficha Médica</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Edición</th>
            </tr>
          </thead>
          <tbody>
            {patientsList.map((patient) => (
              <tr key={patient._id} className="hover:bg-gray-200">
                <td className="py-4 px-6 border-b text-gray-500">{patient.rut}</td>
                <td className="py-4 px-6 border-b text-gray-700 text-lg">{patient.nombre}</td>
                <td className="py-4 px-6 border-b text-gray-700 text-lg">{patient.apellidoPaterno}</td>
                <td className="py-4 px-6 border-b text-gray-700 text-lg">{patient.apellidoMaterno}</td>
                <td className="py-4 px-6 border-b text-gray-700 text-lg">{patient.email}</td>
                <td className="py-4 px-6 border-b text-gray-700 text-lg">
                  <span
                    className={`${patient.fichaMedica ? 'bg-green-100 text-green-800' : 'bg-red-100 text-reed-800'} px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer`}
                    onClick={() => handleOpenModal(patient)}
                    >
                    {patient.fichaMedica ? 'Existe' : 'No Existe'}
                  </span>
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
    </div>
        </div>
  );
};

export default PatientList;
