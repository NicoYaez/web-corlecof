import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { setCookie } from 'nookies';
import Footer from '@/components/Footer/footer';

const validateRUT = (rut) => {
    rut = rut.replace(/[^0-9kK]/g, '');
    if (rut.length < 7) return false;
    let body = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += body.charAt(i) * multiplier;
        multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }

    let calculatedDV = 11 - (sum % 11);
    if (calculatedDV === 11) calculatedDV = '0';
    if (calculatedDV === 10) calculatedDV = 'K';

    return dv === calculatedDV.toString();
}

const formatRUT = (rut) => {
    rut = rut.replace(/[^0-9kK]/g, ''); // Elimina caracteres no válidos
    if (rut.length <= 1) return rut;
    let body = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    return body + '-' + dv;
}

const Login = () => {
    const router = useRouter();
    const api = process.env.NEXT_PUBLIC_API_LINK;

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const icon = showPassword ? faEye : faEyeSlash;
    const title = showPassword ? "Ocultar contraseña" : "Mostrar contraseña";

    const [credentials, setCredentials] = useState({
        rut: '',
        password: ''
    });

    const handleChangeRUT = (e) => {
        const formattedRUT = formatRUT(e.target.value);
        setCredentials({
            ...credentials,
            [e.target.name]: formattedRUT
        });
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!validateRUT(credentials.rut)) {
            setErrorMessage('RUT inválido');
            return;
        }

        try {
            const response = await axios.post(`${api}/auth/login`, credentials);
            const token = response.data.token;

            setCookie(null, 'token', token, {
                maxAge: rememberMe ? 30 * 24 * 60 * 60 : null, // Expires after 30 days if "Remember me" is checked, otherwise expires with the session
                path: '/',
            });

            if (response.status === 200) {
                router.push('/dashboard/secretary');
            }

        } catch (error) {
            console.log(error.response);

            if (error.response.status === 404) {
                setErrorMessage('RUT no registrado');
            }

            if (error.response.status === 401) {
                setErrorMessage('RUT o contraseña incorrectos');
            }
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head>
                <title>Iniciar sesión | CORLECOF</title>
            </Head>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-20 w-auto"
                    src="/images/logo.png"
                    alt="Logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Iniciar sesión en tu cuenta
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-20">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
                                RUT
                            </label>
                            <div className="mt-1">
                                <input
                                    id="rut"
                                    name="rut"
                                    type="text"
                                    autoComplete="rut"
                                    required
                                    value={credentials.rut}
                                    onChange={handleChangeRUT}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    onChange={handleChange}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-100 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                                    <button type="button" className="px-3 py-2 text-gray-400 hover:text-gray-500" onClick={handleShowPassword}>
                                        <FontAwesomeIcon fill="none" className="h-5 w-5" icon={icon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                                    onChange={handleRememberMeChange}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/auth/forgot-password" className="font-medium text-blue-500 hover:text-indigo-500">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Iniciar sesión
                            </button>
                            {errorMessage && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md border border-red-300 rounded">
                                <div className="bg-red-50 py-3 px-3 sm:px-6 sm:rounded-md sm:px-10">
                                    <p className="text-sm text-gray-600 text-center">{errorMessage}</p>
                                </div>
                            </div>}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
