import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/Corazón.png';
import BottomNavbar from '../../../Pages/shared/BottomNavbar/BottomNavbar';
import Header from '../../../Pages/shared/header/Header';
import './styles.css';

const Loader = () => {
  return (
    
    <div className="full-screen-container d-flex flex-column">
      <Header/>
      <div className="agendar-container text-center">
        {/* Solo imagen del logo */}
        <img className="img-fluid mb-3 logo-img" src={logo} alt="Logo de Salud Vital" />
        <span className="salud-vital">Salud Vital</span>
        <h2 className="mb-3 horario-atencion">Horario de Atención</h2>
        <p>Lunes a Viernes: 7:00 am - 7:00 pm</p>
        <p>Sábados: 7:00 am - 1:00 pm</p>
        {/* Botón de agendar cita */}
        <NavLink to='/cita' className="btn btn-custom mt-4 mb-5">Agendar Cita</NavLink>
        {/* Espacio para el navbar */}
      </div>
      <BottomNavbar/>
        
    </div>
  );
};

export default Loader;
