import '@/styles/globals.css'
import '@/styles/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
// pages/_app.js
import React from 'react';
import { PatientProvider } from '../context/PatientContext';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-blue-300 min-h-screen">

    <PatientProvider>
      <Component {...pageProps} />
    </PatientProvider>
    </div>
  );
}

export default MyApp;

