import axios from "axios"

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URL 

export const createAppointment = async (cita) => {
    try{
        const response = await axios.post(`${BACKEND_ENDPOINT}/consultas`, cita);
        return response.data;
    }catch (error){
        console.error('Error al obtener la consulta médica:', error);
        throw error;
    }
}