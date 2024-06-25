import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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

const Register = () => {
    const router = useRouter();
    const api = process.env.NEXT_PUBLIC_API_LINK;

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const icon = showPassword ? faEye : faEyeSlash;
    const title = showPassword ? "Ocultar contraseña" : "Mostrar contraseña";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rut: '',
        role: '',
        speciality: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeRUT = (e) => {
        const formattedRUT = formatRUT(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: formattedRUT
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateRUT(formData.rut)) {
            setErrorMessage('RUT inválido');
            return;
        }

        try {
            const response = await axios.post(`${api}/auth/register`, formData);
            setSuccessMessage(`Usuario registrado con éxito. Contraseña: ${response.data.password}`);
            setErrorMessage('');
            setFormData({
                name: '',
                email: '',
                rut: '',
                role: '',
                speciality: ''
            });

            // Redireccionar al login después de un breve retraso
            router.push('/auth/login');
        } catch (err) {
            setErrorMessage(err.response.data.message || 'Error al registrar el usuario');
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head>
                <title>Registrar Usuario | CORLECOF</title>
            </Head>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-20 w-auto"
                    src="/images/logo.png"
                    alt="Logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Registrar Usuario
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-20">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

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
                                    value={formData.rut}
                                    onChange={handleChangeRUT}
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Rol
                            </label>
                            <div className="mt-1">
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="Profesional">Profesional</option>
                                    <option value="Secretary">Secretary</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        {formData.role === 'Profesional' && (
                            <div>
                                <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
                                    Especialidad
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="speciality"
                                        name="speciality"
                                        type="text"
                                        value={formData.speciality}
                                        onChange={handleChange}
                                        required={formData.role === 'Profesional'}
                                        className="field input-field appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-gray-50 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Registrar
                            </button>
                            {errorMessage && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md border border-red-300 rounded">
                                <div className="bg-red-50 py-3 px-3 sm:px-6 sm:rounded-md sm:px-10">
                                    <p className="text-sm text-gray-600 text-center">{errorMessage}</p>
                                </div>
                            </div>}
                            {successMessage && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md border border-green-300 rounded">
                                <div className="bg-green-50 py-3 px-3 sm:px-6 sm:rounded-md sm:px-10">
                                    <p className="text-sm text-gray-600 text-center">{successMessage}</p>
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

export default Register;
