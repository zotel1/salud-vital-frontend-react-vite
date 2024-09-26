import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/Corazón.png';
import BottomNavbar from '../../Pages/shared/BottomNavbar/BottomNavbar';
import Header from '../../Pages/shared/header/Header';
import './AgendarStyles.css';
import homeImg from '../../assets/img/Illustration.png'
import addDate from '../../assets/icons/AddDate.png'
import HomeBtnLines from '../../assets/icons/HomeBtnLines.png'
const Agendar = () => {
  return (
    
    <div className="full-screen-container d-flex flex-column">
      <Header/>
      <div className="agendar-container text-center">
        <img src={homeImg} alt="No tienes ninguna cita" className=''/>
        <p className='noDatesText1 mb-0'>No Tienes Ninguna Cita</p>
        <p className='noDatesText2'>Haga click en el botón para agregar cita</p>
        <img src={HomeBtnLines} alt="" className='HomeBtnLines'/>
        <NavLink to='/consulta/1'>
          <img src={addDate} alt="" className='HomeBtnPosition'/>
        </NavLink>
      </div>
      <BottomNavbar/>
        
    </div>
  );
};

export default Agendar;
