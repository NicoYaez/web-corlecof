import React, { useState } from 'react';
import Patient from '@/models/Patient';

const FormPatient = ({ createPatient }) => {
  const [rut, setRut] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPatient = new Patient(rut, name,lastName, middleName, email);
    createPatient(newPatient);
    setName('');
  }

  return (
    <div className="mt-4">
      <h2>Create Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
            Rut:
          </label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
            Middle Name:
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Patient
        </button>
      </form>
    </div>
  );
};

export default FormPatient;
