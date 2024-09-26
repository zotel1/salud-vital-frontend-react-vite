import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import BottomNavbar from '../../Pages/shared/BottomNavbar/BottomNavbar';
import Header from '../../Pages/shared/header/Header';
import './AgendarConStyles.css';
import addDate from '../../assets/icons/AddDate.png';
import useFetchAppointments from '../../hooks/useFetchAppointments';
import Appointment from '../Appointment/Appointment';
import homeImg from '../../assets/img/Illustration.png';
import HomeBtnLines from '../../assets/icons/HomeBtnLines.png';
import Spinner from 'react-bootstrap/Spinner';
import useDeleteAppointment from '../../hooks/useDeleteAppointment';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AgendarCon = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const idPaciente = 1;
  const { appointments, loading, error } = useFetchAppointments(idPaciente, refreshTrigger);

  const handleDeleteSuccess = (appointmentId, appointmentDate) => {
    const now = new Date();
    const appointmentTime = new Date(appointmentDate);
    const timeDifference = appointmentTime - now;

    if (timeDifference < 24 * 60 * 60 * 1000) {
      Swal.fire({
        icon: 'warning',
        title: 'No se puede eliminar la cita',
        text: 'Solo puedes eliminar citas con mínimo de antelación de 24 horas.',
      });
    } else {
      // Lógica para eliminar la cita
      setRefreshTrigger(prev => !prev);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureAppointments = appointments
    .filter(appointment => {
      const appointmentDate = new Date(appointment.fecha);
      return appointmentDate >= today;
    })
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="vh-100 d-flex flex-column position-relative">
      <Header />
      <div className="p-3 pt-0 ms-1 flex-grow-1 overflow-auto">
        {error ? (
          <p>Error al cargar las citas: {error}</p>
        ) : (
          <>
            {!loading && appointments.length === 0 ? (
              <div className="text-center">
                <img src={homeImg} alt="No tienes ninguna cita" className='' />
                <p className='noDatesText1 mb-0'>No Tienes Ninguna Cita</p>
                <p className='noDatesText2'>Haga click en el botón para agregar cita</p>
                <img src={HomeBtnLines} alt="Flecha señalando boton de agregar consulta" className='HomeBtnLines' />
                <NavLink to='/consulta/:pacienteId'>
                  <img src={addDate} alt="Boton para agregar consulta" className='HomeBtnPosition' />
                </NavLink>
              </div>
            ) : (
              <>
                <p className='header position-sticky top-0 bg-white'>Proximas citas</p>
                <div className='d-flex flex-column align-items-center'>
                  {loading && <Spinner animation="border" variant="warning" role="status" />}
                  {!loading && !error && futureAppointments.map((appointment) => (
                    <Appointment
                      key={appointment.id}
                      id={appointment.id}
                      title={appointment.especialidad}
                      doctor={`Dr. ${appointment.doctorName}`}
                      date={formatDate(appointment.fecha)}
                      time={new Date(appointment.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      onDeleteSuccess={() => handleDeleteSuccess(appointment.id, appointment.fecha)}
                    />
                  ))}
                </div>
                <NavLink to='/consulta/:pacienteId'>
                  <img src={addDate} alt="Add Date Button" className='fixed-bottom-right' />
                </NavLink>
              </>
            )}
          </>
        )}
      </div>
      <BottomNavbar className='position-fixed bottom-0 w-100' />
    </div>
  );
};

export default AgendarCon;
