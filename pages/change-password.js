import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import jwt from 'jsonwebtoken'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Footer from '@/components/Footer/footer';

export async function getServerSideProps(context) {
    const token = context.req.cookies.token || '';

    // Devolvemos el token
    return {
        props: {
            token
        }
    };
}

function ChangePasswordPage({ token }) {
    const api = process.env.NEXT_PUBLIC_API_LINK

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordN, setShowPasswordN] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);

    const icon = showPassword ? faEye : faEyeSlash;
    const iconN = showPasswordN ? faEye : faEyeSlash;
    const iconC = showPasswordC ? faEye : faEyeSlash;

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${api}/auth/change-password`, {
                currentPassword,
                newPassword,
                confirmPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('Contraseña cambiada con éxito');
        } catch (err) {
            if (err.response) {
                // Si el servidor respondió con un mensaje de error, utilízalo
                setMessage(err.response.data.message);
            } else if (err.request) {
                // El servidor no respondió
                setMessage('El servidor no respondió. Por favor, intente de nuevo más tarde.');
            } else {
                // Algo sucedió en la configuración de la solicitud que disparó un error
                setMessage('Error al cambiar la contraseña: ' + err.message);
            }
        }
    };


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowPasswordN = () => {
        setShowPasswordN(!showPasswordN);
    };
    const handleShowPasswordC = () => {
        setShowPasswordC(!showPasswordC);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head>
                <title>Cambio de contraseña | AgroHeladas</title>
            </Head>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-20 w-auto"
                    src="images/logo.png"
                    alt="Logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Cambia tu contraseña
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-20">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleChangePassword}>
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                Contraseña actual
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                                    <button type="button" className="px-3 py-2 text-gray-400 hover:text-gray-500" onClick={handleShowPassword}>
                                        <FontAwesomeIcon fill="none" className="h-5 w-5" icon={icon} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                Nueva contraseña
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPasswordN ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                                    <button type="button" className="px-3 py-2 text-gray-400 hover:text-gray-500" onClick={handleShowPasswordN}>
                                        <FontAwesomeIcon fill="none" className="h-5 w-5" icon={iconN} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirma la nueva contraseña
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPasswordC ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                                    <button type="button" className="px-3 py-2 text-gray-400 hover:text-gray-500" onClick={handleShowPasswordC}>
                                        <FontAwesomeIcon fill="none" className="h-5 w-5" icon={iconC} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cambiar contraseña
                            </button>
                            {message && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md border border-red-300 rounded">
                                <div className="bg-red-50 py-3 px-3 sm:px-6 sm:rounded-md sm:px-10">
                                    <p className="text-sm text-gray-600 text-center">{message}</p>
                                </div>
                            </div>}
                        </div>
                    </form>
                </div>
            </div >

            
            <Footer />
        </div>
    );
}

export default ChangePasswordPage;

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
                    <p className="text-sm text-gray-600 text-center mt-5"><Link legacyBehavior href="/inicio">
                        <a className="font-medium text-green-600 hover:text-green-500">
                        <i className="fas fa-arrow-left mr-2 text-sm text-green-600"></i>
                            Volver
                        </a>
                    </Link>
                    </p>
                </div>
            </div>

*/
