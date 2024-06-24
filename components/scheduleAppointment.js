import React, {useState} from 'react';
import Profesional from '@/models/Profesional';
import User from '@/models/User';

const ScheduleAppointment = ({ onAppointmentScheduled }) => {
    const horas = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const profesionales = [new Profesional('18373584-5','Alberto','Correa','Peña','a.correa.pena@outlook.com','Medicina G'),
                        new Profesional('7025229-5','Cristian','Gonzalez','Gonzalez','CR@hotmail.com','Kinesiologo') 
                        ];

    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
    // Dividir el arreglo de horas en dos subarreglos
    const primeraMitad = horas.slice(0, horas.length / 2);
    const segundaMitad = horas.slice(horas.length / 2);

    return(
        <div className="flex flex-col justify-center items-center h-screen"> {/* Cambiado a flex-col para organizar verticalmente */}
        <div>
            <label htmlFor="profesionalSelect">Elige un Profesional:</label>
            <select
                id="profesionalSelect"
                value={profesionalSeleccionado}
                onChange={(e) => setProfesionalSeleccionado(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
            >
                <option value="" >Seleccione un Profesional</option>
                {profesionales.map((profesional, index) => (
                    <option key={index} value={profesional.getRut()}>
                        {profesional.getName()} {profesional.getLastName()}
                    </option>
                ))}
            </select>
        </div>
        
            
            <table className="w-full max-w-4xl mx-auto table-auto mt-10"> {/* Ajusta el ancho máximo según necesites */}
                <thead>
                    <tr>
                        <th colSpan="2" className="text-center">Seleccionar Hora</th>
                    </tr>
                </thead>
                <tbody>
    {primeraMitad.map((hora, index) => (
        <tr key={index}>
            <td>
                {hora}
            </td>
            <td>
                <button 
                    onClick={() => onAppointmentScheduled(hora)} 
                    className="ml-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Asignar
                </button>
            </td>
            {segundaMitad[index] && (
                <>
                    <td>
                        {segundaMitad[index]}
                    </td>    
                    <td>
                        <button 
                            onClick={() => onAppointmentScheduled(segundaMitad[index])} 
                            className="ml-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Asignar
                        </button>
                    </td>
                </>
            )}
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
};

export default ScheduleAppointment;