import React, { useState, useEffect } from 'react';

const ModalAppointment = ({ appointment, onClose }) => {
  // Estado local para gestionar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    // Añade aquí más campos según necesites
  });

  // Efecto para inicializar el formulario con los datos de la appointment
  useEffect(() => {
    if (appointment) {
      setFormData({
        nombre: appointment.getPacient().getName(), // Asegúrate de que estos campos coincidan con los de tu objeto appointment
        fecha: appointment.getAppointmentDate(),
        hora: appointment.getAppointmentTime(),
        // Inicializa aquí más campos según necesites
      });
    }
  }, [appointment]);

  // Manejador para los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías implementar la lógica para actualizar la appointment
    appointment.setAppointmentDate(formData.fecha);
    appointment.setAppointmentTime(formData.hora);
    onClose(); // Cierra el modal después de actualizar
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Modificar appointment</h3>
          <button onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="my-4">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="my-4">
            <label>Hora:</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Añade aquí más campos según necesites */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAppointment;