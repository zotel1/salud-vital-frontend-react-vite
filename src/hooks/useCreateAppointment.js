/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createAppointment } from "../api/createAppointment";
import { getEspecialidades } from "../api/getEspecialidades";
import { getMedicos } from "../api/getMedicos";


const useCreateAppointment = () =>{
    // const {idPaciente} = useParams();
    const idPaciente = 1;
    const [appointmentState, setAppointmentState] = useState({
        idMedico:'',
        fecha: new Date().toISOString(),
        especialidad: '',
        // hora:'',
    });

    const [medicos, setMedicos] = useState([]);
    const [especialidades, setEspecialidades] = useState([])
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const medicosData = await getMedicos();
                // console.log('Datos de Medicos:', medicosData)

                const especialidadesData = await getEspecialidades();
                // console.log('Datos de especialidades:', especialidadesData);

                setMedicos(medicosData);
                setEspecialidades(especialidadesData.content)
                
            }catch(error){
                console.log('Error al cargar datos:', error)
            }
        };
        fetchData()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'especialidad'){
            setAppointmentState((prevState)=>({
                ...prevState,
                [name]: value,
                idMedico: '',
            }));
        } else {
            setAppointmentState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if(!appointmentState.idMedico) newErrors.idMedico = "Es necesario seleccionar un médico";
        if(!appointmentState.especialidad) newErrors.especialidad = "Es necesario seleccionar una especialidad";
        if(!appointmentState.fecha) newErrors.fecha = "Es necesario seleccionar una fecha";
        
        return newErrors;
    };

    const handleSubmit = async (cita) => {
        const formErrors = validate();
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        }else{
            setErrors({});
            setIsSubmitting(true);
            setLoading(true);
            try{
                await createAppointment(cita, idPaciente);
                Swal.fire({
                    icon: "success",
                    title: "Consulta creada con éxito",
                    text: "La consulta médica ha sido registrada",
                    timer: 3000,
                }).then(()=>{
                    navigate('/confirmacion', {state: {cita}})
                })
            }catch(error){
                Swal.fire({
                    icon: "error",
                    title: "Error al crear consulta",
                    text: "Por favor, intenta de nuevo",
                    timer: 3000,
                });
            }finally{
                setIsSubmitting(false);
                setLoading(false);
            }
        }
    };

    return{
        appointmentState,
        medicos,
        especialidades,
        errors,
        loading,
        isSubmitting,
        handleChange,
        handleSubmit,
    };

};

export default useCreateAppointment;