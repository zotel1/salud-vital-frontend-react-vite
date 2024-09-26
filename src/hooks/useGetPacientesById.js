import { useState, useEffect } from "react";
import { getPacientesById } from "../api/getPacientById";


const useGetPacientesById = () => {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const idPaciente=1;

  useEffect(() => {
    const fetchPaciente = async () => {
      setLoading(true);
      setError(null);
      try {
        const pacienteData = await getPacientesById(idPaciente);
        // console.log('Datos del paciente:', pacienteData);
        if(pacienteData){
          setPaciente(pacienteData);
        }else{
          console.error('no se recibieron datos.')
        }
      } catch (err) {
        setError(err);
        console.error('error en la llamada api dentro del hook', err)
      } finally {
        setLoading(false);
        // console.log('estado final del paciente', paciente)
      }
    };

    if (idPaciente) {
      fetchPaciente();
    }
  }, [idPaciente]);

  return { paciente, loading, error };
};

export default useGetPacientesById;
