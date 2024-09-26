import axios from "axios"

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URL 

export const deleteAppointment = async (id, motivo) => {
     console.log('Eliminando cita con ID:', id, 'y motivo:', motivo);
    try{
        const response = await axios.delete(`${BACKEND_ENDPOINT}/consultas`,{
            data: {
                idConsulta: id,
                motivo,
            },
        });

        if (response.status === 200 || response.status === 204) {
            console.log('Cita eliminada exitosamente, respuesta:', response.data);
            return response.data;
        } else {
            console.warn('Error al eliminar la cita, status:', response.status);
            throw new Error('No se pudo eliminar la cita correctamente.');
        }
    }catch (error){
        console.error('Error al eliminar la consulta médica:', error);
        throw error;
    }
}