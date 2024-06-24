import React, { useState, useEffect } from "react";
import PatientList from "@/components/patienList";
import AppointmentList from "@/components/appointmentList";
import FormPatient from "@/components/formPatient";
import Patient from "@/models/Patient";
import MedicalAppointment from "@/models/MedicalAppointment";
import ScheduleAppointment from "@/components/scheduleAppointment";

const Secretary = () => {
  const [currentView, setCurrentView] = useState('appointments'); // State to control the current view
  const [patients, setPatients] = useState([new Patient('A','B','C','D','E')]); // State to store patients
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [appointments, setAppointments] = useState([new MedicalAppointment(1,'',patients[0],'no','no','12','12')]); // State to store appointments
  const [profesional, setProfesional] = useState([]); // State to store profesional
  const changeView = (view) => {
    setCurrentView(view);
    setShowForm(false);
  };

  const createPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
    setShowForm(false);
  };
  

  const toggleForm = () => {
    setShowForm(!showForm);
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
          onClick={() => changeView('sportsWorkshop')}
        >
          Ver Tallerer
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => changeView('appointments')}
        >
          Ver Citas
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={toggleForm}
        >
          Crear Paciente
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => changeView('scheduleAppointment')}>
          Agendar Cita
        </button>
      </div>

      {showForm && (
        <div className="mt-4">
          <FormPatient createPatient={createPatient} />
        </div>
      )}

      {currentView === 'patients' && <PatientList patients={patients} />}
      {currentView === 'appointments' && <AppointmentList appointments={appointments} />}
      {currentView === 'scheduleAppointment' && <ScheduleAppointment />}
    </div>
  );
};

export default Secretary;
