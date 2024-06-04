import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer/footer';

const RequestPasswordResetPage = () => {
  const api = process.env.NEXT_PUBLIC_API_LINK
  const [errorMessage, setErrorMessage] = useState('');
  const submitRequest = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;

    const response = await fetch(`${api}/auth/request-password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert('Revise su correo electrónico para obtener un enlace de restablecimiento de contraseña');
    } else {
      setErrorMessage('Correo electrónico no registrado');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Head>
          <title>Restablecer contraseña | CORLECOF</title>
        </Head>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto"
            src="images/logo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Restablecer tu contraseña
          </h2>

        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-20">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submitRequest}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Restablecer contraseña
                </button>
                {errorMessage && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md border border-red-300 rounded">
                  <div className="bg-red-50 py-3 px-3 sm:px-6 sm:rounded-md sm:px-10">
                    <p className="text-sm text-gray-600 text-center">{errorMessage}</p>
                  </div>
                </div>}
              </div>
            </form>
          </div>
        </div >
       
        <Footer />
      </div >
    </>
  );
};

export default RequestPasswordResetPage;

/*
 <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-50 py-4 px-4 sm:px-6 sm:rounded-md sm:px-10">
            <p className="text-sm text-gray-600 text-center">
              Al cambiar tu contraseña, estás de acuerdo con nuestros{' '}
              <Link legacyBehavior href="#">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  términos y condiciones
                </a>
              </Link>{' '}
              y nuestra{' '}
              <Link legacyBehavior href="#">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  política de privacidad
                </a>
              </Link>
            </p>
            <p className="text-sm text-gray-600 text-center mt-5"><Link legacyBehavior href="/login">
              <a className="font-medium text-green-600 hover:text-green-500">
                <i className="fas fa-arrow-left mr-2 text-sm text-green-600"></i>
                Volver
              </a>
            </Link>
            </p>
          </div>
        </div>
*/
