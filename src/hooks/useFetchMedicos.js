/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { getMedicos } from './path-to-your-api'; // Ajusta la ruta según corresponda

const useFetchMedicos = () => {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const data = await getMedicos();
                setMedicos(data);
            } catch (error) {
                setError('Error al cargar los médicos');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicos();
    }, []);

    return { medicos, loading, error };
};

export default useFetchMedicos;
