import { Button, Container, Row } from 'react-bootstrap';
import { FaArchive, FaArrowUp, FaHeart } from 'react-icons/fa';
import BottomNavbar from '../shared/BottomNavbar/BottomNavbar';
import './ConfirmacionStyles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../shared/header/Header';
import useDeleteAppointment from '../../hooks/useDeleteAppointment';
import { useEffect } from 'react';

const Confirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { cita } = location.state || {};  // Verifica si el estado contiene cita

  useEffect(() => {
    console.log('Datos de cita:', cita);
    if (!cita || !cita.idMedico) {  // Asegúrate de que 'cita' contenga los datos
      navigate('/home');
    }
  }, [cita, navigate]);


  const { handleDeleteAppointment, loading, error, success } = useDeleteAppointment();

  const handleDeleteClick = async () => {
    if (cita && cita.idMedico) {  // Verifica que 'cita' tenga un id de médico
      console.log('Intentando eliminar la cita con ID:', cita.idMedico);
      try {
        await handleDeleteAppointment(cita.idMedico, 'Motivo de cancelación');
        console.log('Cita eliminada con éxito');
        navigate('/home');
      } catch (err) {
        console.error('Error al eliminar la cita', err);
      }
    } else {
      console.error('Datos de cita no disponibles para eliminar');
    }
  };
  
  const formattedDate = new Date(cita?.fecha).toISOString().split('T')[0];
  const formattedTime = cita?.fecha ? cita.fecha.slice(11, 16) : '';

  return (
    <div className="full-screen-container d-flex flex-column">
      <Header />
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <div className="d-flex flex-column text-center align-items-center p-4">
          <FaHeart size={50} className="confirmacion-icon" />
          <h1 className="successText">Cita agendada con éxito</h1>
          <Row className="mb-2 mt-3 justify-content-center">
            <b><u>Resumen de la cita</u></b>
            <Row>
              <span><b>Especialidad:</b> {cita?.especialidad}</span>
              <span><b>Fecha:</b> {formattedDate}</span>
              <span><b>Hora:</b> {formattedTime}</span>
              <span><b>Doctor:</b> Dr. {cita?.nombreMedico}</span>
            </Row>
          </Row>
          {/* <Row className="confirmacion-row">
            <Button 
              className="btn-cancel text-white" 
              style={{ marginBottom: 0 }}
              onClick={handleDeleteClick}
              disabled={loading}
            >
              <FaArchive /> Cancelar Cita
            </Button>
          </Row> */}
          {error && <div className="text-danger">{error}</div>}
          {success && <div className="text-success">{success}</div>}
          <p>Gracias por preferirnos</p>
          <FaArrowUp size={30} className="confirmacion-arrow" />
        </div>
      </Container>
      <BottomNavbar />
    </div>
  );
};

export default Confirmacion;