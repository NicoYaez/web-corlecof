import React, { useState, useEffect } from "react";
import PatientList from "@/components/patient/patienList";
import AppointmentList from "@/components/appointmentList";
import FormPatient from "@/components/patient/formPatient";
import ScheduleAppointment from "@/components/scheduleAppointment";
<<<<<<< HEAD
import axios from 'axios';

const Secretary = () => {
  const api = process.env.NEXT_PUBLIC_API_LINK;

  const [currentView, setCurrentView] = useState('appointments'); // State to control the current view
  const [patients, setPatients] = useState([]); // State to store patients
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [appointments, setAppointments] = useState([new MedicalAppointment(1, '', patients[0], 'no', 'no', '12', '12')]); // State to store appointments
  const [profesional, setProfesional] = useState([]); // State to store profesional

  useEffect(() => {
    axios.get(`${api}/paciente/list`)
      .then(response => {
        // Asume que la respuesta es un array de pacientes
        setPatients(response.data.map(patientData => new Patient(patientData)));
        console.log(patientData);
      })
      .catch(error => {
        console.error("There was an error fetching the patients:", error);
      });

  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

=======
const Secretary = () => {
  const api = process.env.NEXT_PUBLIC_API_LINK;
  const [currentView, setCurrentView] = useState('appointments'); // State to control the current view
  const [showForm, setShowForm] = useState(false); // State to control form visibility
>>>>>>> 2d76b9d5460e95b3ae19709e3b00a68dd550e8bb
  const changeView = (view) => {
    setCurrentView(view);
    setShowForm(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

<<<<<<< HEAD
  const createPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
=======
  const handleOpenModal = () => {
    setIsModalOpen(true);
>>>>>>> 2d76b9d5460e95b3ae19709e3b00a68dd550e8bb
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
          onClick={() => handleOpenModal()}
        >
          Crear Paciente
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => changeView('scheduleAppointment')}>
          Agendar Cita
        </button>
      </div>


      {isModalOpen && <FormPatient  onClose={() => setIsModalOpen(false)} />}
      {currentView === 'patients' && <PatientList />}
      {currentView === 'appointments' && <AppointmentList />}
      {currentView === 'scheduleAppointment' && <ScheduleAppointment />}
    </div>
  );
};

export default Secretary;