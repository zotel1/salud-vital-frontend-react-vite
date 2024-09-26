import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useDeleteAppointment from '../../hooks/useDeleteAppointment';
import '../Appointment/AppointmentStyles.css'

const MySwal = withReactContent(Swal);

const Appointment = ({id, title, doctor, date, time, onDeleteSuccess}) => {
  const { handleDeleteAppointment, loading, error, success } = useDeleteAppointment();
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false);

  const handleDeleteClick = async () => {
    MySwal.fire({
      title: '¿Estás seguro que quieres eliminar la consulta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteAppointment(id, 'PACIENTE_DESISTIO');
          MySwal.fire('Eliminado', 'La consulta ha sido eliminada.', 'success');
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        } catch (err) {
          if (err.response && err.response.data && err.response.data.message) {
            MySwal.fire('Error', err.response.data.message, 'error');
          } else {
            MySwal.fire('Error al eliminar consulta', 'La consulta puede ser cancelada con antecedencia mínima de 24hs!', 'error');
            setDragOffset(0);
            setIsDragging(false);
          }
          console.error('Error al eliminar la cita', err);
        }
        
      } else {
        setDragOffset(0);
        setIsDragging(false);
      }
    });
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) =>{
      if(eventData.deltaX < 0){
        setIsDragging(true);
        setDragOffset(eventData.deltaX);
      }
    },
    onSwipedLeft: () => {
      if(dragOffset < -150){
        handleDeleteClick();
      }else {
        setDragOffset(0);
        setIsDragging(false);
      }
    },
    onSwipedRight: () => {
      setDragOffset(0);
      setIsDragging(false);

    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  })

  return (
    <div {...handlers} className={`d-flex justify-content-between align-items-center date px-3 rounded-4 mb-2 w-100 `}
    style={{ transform: `translateX(${dragOffset}px)`, 
    transition: isDragging ? 'none' : 'transform 0.3s ease-in-out', 
    }}
    >
      <div>
        <p className='headline-2 m-0 p-0'>{title}</p>
        <p className='homeDr m-0 '>{doctor}</p>
      </div>
      <div className='d-flex'>
        <div className='homeCircleDate d-flex flex-column justify-content-center align-items-center'>
          <p className='headline-2 m-0 text-center'>{date}</p>
          <p className='homeTime mb-2 text-center'>{time}</p>
        </div>
        {/* <button onClick={handleDeleteClick} disabled={loading} className='deleteBtn'>
          x
        </button> */}
      </div>
    </div>
  );
};

export default Appointment;
