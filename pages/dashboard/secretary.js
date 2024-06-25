import React, { useState, useEffect } from "react";
import PatientList from "@/components/patient/patienList";
import AppointmentList from "@/components/appointmentList";
import FormPatient from "@/components/patient/formPatient";
import ScheduleAppointment from "@/components/scheduleAppointment";
import { useRouter } from 'next/router';
const Secretary = () => {
  const api = process.env.NEXT_PUBLIC_API_LINK;
  const [currentView, setCurrentView] = useState('appointments'); // State to control the current view
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const changeView = (view) => {
    setCurrentView(view);
    setShowForm(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (

    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => changeView('patients')}
        >
          Ver Pacientes
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => router.push('/talleres/list-talleres')}
          >
          Ver Talleres
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => changeView('appointments')}
          >
          Ver Citas
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => handleOpenModal()}
          >
          Crear Paciente
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => router.push('/cita/agendar')}>
          Agendar Cita
        </button>
      </div>


      {isModalOpen && <FormPatient onClose={() => setIsModalOpen(false)} />}
      {currentView === 'patients' && <PatientList />}
      {currentView === 'appointments' && <AppointmentList />}
      {currentView === 'scheduleAppointment' && <ScheduleAppointment />}
    </div>
   
  );
};

export default Secretary;