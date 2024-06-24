import React, { useState } from 'react';

const PatientList = ({ patients }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [hoveredPatientId, setHoveredPatientId] = useState(''); // New state for hovered patient ID

  const handleMouseEnter = (patient) => {
    const tooltipText = patient.tieneFichaClinica ? 'View Medical Record' : 'Create Medical Record';
    setShowTooltip(true);
    setTooltipContent(tooltipText);
    setHoveredPatientId(patient.id); // Update hovered patient ID
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipContent('');
    setHoveredPatientId(''); // Reset hoveredPatientId when leaving any button
  };

  return (
    <div className="mt-4">
      <h2>Patient List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-center">Number</th>
            <th className="text-center">Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Middle Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Medical Record</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.getRut()}>
              <td className="text-center">{patient.getRut()}</td>
              <td className="text-center">{patient.getName()}</td>
              <td className="text-center">{patient.getLastName()}</td>
              <td className="text-center">{patient.getMiddleName()}</td>
              <td className="text-center">{patient.getEmail()}</td>
              <td className="text-center">
                <div className="relative">
                  {patient.tieneFichaClinica ? (
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none"
                      onMouseEnter={() => handleMouseEnter(patient)}
                      onMouseLeave={handleMouseLeave}
                    >
                      View Medical Record
                    </button>
                  ) : (
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                      onMouseEnter={() => handleMouseEnter(patient)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Create Medical Record
                    </button>
                  )}
                  {showTooltip && tooltipContent && hoveredPatientId === patient.id && ( // Check hoveredPatientId
                    <div
                      className="absolute top-0 left-0 mt-2 p-2 bg-gray-500 rounded-md shadow-md z-10"
                      style={{ visibility: showTooltip ? 'visible' : 'hidden' }}
                    >
                      {tooltipContent}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
