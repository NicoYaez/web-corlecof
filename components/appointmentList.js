import React, { useState } from 'react';
import ModalAppointment from './modalAppointment';


const AppointmentList = ({ appointments }) => {
   // Estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // 1. Agregar estado para cada filtro
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const abrirModalConDatos = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };
  const actualizarListaCitas = async () => {
    // Aquí deberías recargar las citas desde tu backend o actualizar el estado local
    // Por ejemplo, si tienes una función que carga las citas:
    await cargarCitas();
  };
  
  // 4. Filtrar los datos basados en los filtros aplicados
  const filteredAppointments = appointments.filter(appointment => {
    const patientName = `${appointment.getPacient().getName()} ${appointment.getPacient().getLastName()}`;
    const appointmentDate = appointment.getAppointmentDate();
    const appointmentTime = appointment.getAppointmentTime(); // Asumiendo que existe getAppointmentTime
    const status = appointment.getStatus();

    
    return (
      (filterDate ? appointmentDate.includes(filterDate) : true) &&
      (filterName ? patientName.toLowerCase().includes(filterName.toLowerCase()) : true) &&
      (filterTime ? appointmentTime.includes(filterTime) : true) &&
      (filterStatus ? status.toLowerCase().includes(filterStatus.toLowerCase()) : true)
    );
  });

  return (
    <div className="mt-4">
      {/* 2. Crear campos de entrada para los filtros */}
      <div className="filter-bar w-full flex justify-center">
        <input className='text-center' type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
        <input className='text-center' type="text" placeholder="Nombre o Apellido" value={filterName} onChange={e => setFilterName(e.target.value)} />
        <input className='text-center' type="time" value={filterTime} onChange={e => setFilterTime(e.target.value)} />
        <input className='text-center' type="text" placeholder="Estado" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} />
      </div>
      <table className="w-full table-auto mt-10">
        <tbody>
          {/* 5. Renderizar los datos filtrados */}
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.getId()}>
              <td className="text-center">{appointment.getPacient().getName()} {appointment.getPacient().getLastName()} </td>
              <td className="text-center">{appointment.getAppointmentDate()} </td>
              <td className="text-center">{appointment.getAppointmentTime()} </td>
              <td className="text-center">
                <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700" onClick={() => abrirModalConDatos(appointment)}>Modificar</button>
              </td>
              <td className="text-center">{appointment.getStatus()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ModalAppointment appointment={selectedAppointment} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AppointmentList;
