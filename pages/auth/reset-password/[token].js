import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
export async function getServerSideProps(context) {
    const { token } = context.query;

    return {
        props: {
            token
        }
    };
}

const ResetPasswordPage = (token) => {
    const api = process.env.NEXT_PUBLIC_API_LINK
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);

    const submitNewPassword = async (event) => {
        event.preventDefault();

        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post(`${api}/auth/reset-password`, { token, password });

            if (response.status !== 200) {
                setErrorMessage(response.data.message);
            }
            else {
                alert('Contraseña actualizada correctamente');
                router.push('/login');  // redirección aquí
            }
        } catch (error) {
            setErrorMessage('A occudido un error al restablecer la contraseña');
        }
    };

    const icon = showPassword ? faEye : faEyeSlash;
    const iconC = showPasswordC ? faEye : faEyeSlash;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowPasswordC = () => {
        setShowPasswordC(!showPasswordC);
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
                        src="../images/logo.png"
                        alt="Logo"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Restablecer contraseña
                    </h2>

                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={submitNewPassword}>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Nueva contraseña
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
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
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmar contraseña
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPasswordC ? 'text' : 'password'}
                                        required
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
                                    Actualizar contraseña
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

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-gray-50 py-4 px-4 sm:px-6 sm:rounded-md sm:px-10">
                        <p className="text-sm text-gray-600 text-center">
                            Al enviar tu nueva contraseña, estás de acuerdo con nuestros{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                términos y condiciones
                            </a>{' '}
                            y nuestra{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                política de privacidad
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div >
        </>
    );
};

export default ResetPasswordPage;
