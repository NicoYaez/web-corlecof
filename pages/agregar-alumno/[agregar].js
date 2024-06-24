import { useEffect, useState } from 'react';
import axios from 'axios';

const TallerDetailPage = ({ tallerId }) => {
    const api = process.env.NEXT_PUBLIC_API_LINK;
    const [taller, setTaller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participantIds, setParticipantIds] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);

    useEffect(() => {
        if (tallerId) {
            const fetchTaller = async () => {
                try {
                    const res = await axios.post(`${api}/taller/register`, form);
                    setTaller(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching taller:', error);
                    setLoading(false);
                }
            };
    
            fetchTaller();
        }
    }, [tallerId]);
    

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get('/api/user/list');
                setUsuarios(res.data);
                setLoadingUsuarios(false);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
                setLoadingUsuarios(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleAddParticipants = async () => {
        try {
            const response = await axios.put(`${api}/taller/register, form;/assign-participants`, {
                participantIds: participantIds.split(',')
            });
            console.log('Participantes agregados al taller:', response.data);
            // Aquí podrías actualizar el estado o realizar alguna acción adicional
        } catch (error) {
            console.error('Error al agregar participantes:', error);
        }
    };

    if (loading || loadingUsuarios) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Detalles del Taller: {taller.name}</h1>
            <p>Profesional: {taller.profesional}</p>
            <p>Inicio: {new Date(taller.startTime).toLocaleString()}</p>
            <p>Fin: {new Date(taller.endTime).toLocaleString()}</p>
            <p>Duración: {taller.duration} minutos</p>
            <p>Descripción: {taller.description}</p>
            <p>Tipo: {taller.type}</p>
            <p>Participantes: {taller.participants.length}/{taller.maxParticipants}</p>
            
            <div>
                <h2>Lista de Usuarios Disponibles</h2>
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario._id}>
                            {usuario.name} ({usuario.email})
                            <button onClick={() => setParticipantIds(prevIds => prevIds ? `${prevIds},${usuario._id}` : `${usuario._id}`)}>Agregar</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <input 
                    type="text" 
                    value={participantIds} 
                    onChange={(e) => setParticipantIds(e.target.value)} 
                    placeholder="IDs de participantes (separados por comas)" 
                />
                <button onClick={handleAddParticipants}>Agregar Participantes</button>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;

    return {
        props: {
            tallerId: id
        }
    };
}

export default TallerDetailPage;