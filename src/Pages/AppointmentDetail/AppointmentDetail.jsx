import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../shared/header/Header';
import BottomNavbar from '../shared/BottomNavbar/BottomNavbar';
import useFetchAppointments from '../../hooks/useFetchAppointments';


const AppointmentDetail = () => {
  const { id } = useParams(); // Obtener el id de la consulta de la URL
  const { appointments, loading, error } = useFetchAppointments(1); // Hook para obtener los detalles

  
  const appointment = appointments.find(appointment => appointment.id === Number(id));

  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <Header />
      <div className="p-3 flex-grow-1 ">
        <p className='header'>Detalles de la Consulta</p>
        {error ? (
            <p>Error al cargar las citas: {error}</p>
        ):(
            <>
                <div className='d-flex flex-column align-items-center '>
                    {loading && <Spinner animation="border" variant="warning" role="status"/>}
                </div>
                <div>
                    {!loading && !error && appointment && (
                        <div className="appointment-details">
                            <label>Especialidad</label>
                            <input className='personalInfo' type="text" name="" id="" value={appointment.especialidad} disabled/>
                            <label>Doctor</label>
                            <input className='personalInfo' type="text" name="" id="" value={`Dr. ${appointment.doctorName}`} disabled/>
                            <label>Fecha</label>
                            <input className='personalInfo' type="text" name="" id="" value={new Date(appointment.fecha).toLocaleDateString()} disabled/>
                            <label>Hora</label>
                            <input className='personalInfo' type="text" name="" id="" value={formatTime(appointment.fecha)} disabled/>
                            <label>Notas</label>
                            <textarea
                                className='personalInfo'
                                value={appointment.notas || 'Se recomienda realizar estudios de imagen para descartar hernias discales. Se prescriben analgésicos y se aconseja seguir con ejercicios de estiramiento.'}
                                disabled
                                rows={5} 
                                style={{ width: '100%' }} 
                            />
                        </div>
                    )}
                </div>
            </> 
        )}
        </div>
      <BottomNavbar/>
    </div>
  );
}

export default AppointmentDetail;
