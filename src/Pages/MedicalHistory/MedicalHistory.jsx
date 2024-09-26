import BottomNavbar from '../shared/BottomNavbar/BottomNavbar'
import Header from '../shared/header/Header'
import addDate from '../../assets/icons/AddDate.png'
import MedicalHistoryImg from '../../assets/img/MedicalHistoryImg.png'
import './MedicalHistoryStyles.css'
import MedicalHistoryDate from '../../componentes/MedicalHistoryDate/MedicalHistoryDate'
import { NavLink } from 'react-router-dom'
import useFetchAppointments from '../../hooks/useFetchAppointments'
import { Spinner } from 'react-bootstrap'
import Appointment from '../../componentes/Appointment/Appointment'

const MedicalHistory = () => {
  const idPaciente=1;
  const { appointments, loading, error } = useFetchAppointments(idPaciente);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {day: 'numeric', month: 'short'};
    return date.toLocaleDateString('en-GB', options)
  }

  const pastAppointments = appointments.filter(appointment=>{
    const appointmentDate = new Date(appointment.fecha);
    return appointmentDate < today;
  })

  return (
    <div className="vh-100 d-flex flex-column position-relative">
      <Header/>
      <div className="flex-grow-1 overflow-auto">
        <div className='d-flex medicalHistoryPanel rounded-3 m-3 mt-0 py-1 px-3'>
            <div className='d-flex flex-column justify-content-center '>
                <p className='headline-2'>Historial De Consultas</p>
            </div>
            <div>
                <img className='medicalHistoryImg' src={MedicalHistoryImg} alt="" />
            </div>
        </div>
        <div className='flex-grow-1 overflow-auto bg-main p-3 vh-100'>
        {error ? (
            <p>Error al cargar las citas: {error}</p>
            ) : (
              <>
                {!loading && pastAppointments.length === 0 ? (
                  <div className="text-center ">
                    <p className='noDatesText1 mb-0'>No Tienes Ninguna Cita En Historial</p>
                  </div> 
                ) : (
                  <>
                    <div className='d-flex flex-column align-items-center '>
                      {loading && <Spinner animation="border" variant="warning" role="status"/>}
                      {!loading && !error && pastAppointments.map((appointment) => (
                        <MedicalHistoryDate
                          key={appointment.id}
                          id={appointment.id}
                          title={appointment.especialidad}
                          doctor={`Dr. ${appointment.doctorName}`} 
                          date={formatDate(appointment.fecha)}
                          time={new Date(appointment.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        />
                      ))}
                    </div>
                    <NavLink to='/consulta/:pacienteId'>
                      <img src={addDate} alt="Add Date Button" className='fixed-bottom-right'/>
                    </NavLink>
                  </>
                )}
              </>
            )}
        
        </div>
        <NavLink to='/consulta/:pacienteId'>
          <img src={addDate} alt="Add Date Button" className='fixed-bottom-right'/>
        </NavLink>
      </div>
      <BottomNavbar className='position-fixed bottom-0 w-100'/>
        
    </div>
  )
}

export default MedicalHistory;