import 'bootstrap/dist/css/bootstrap.min.css';
import BottomNavbar from '../../Pages/Home/shared/BottomNavbar/BottomNavbar';
import './styles.css';
import Heart from "../../assets/img/Corazón.png"

const Agendar = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-auto">
      <div className="card text-center shadow-sm p-4 d-flex flex-column justify-content-center align-items-center  ">
        {/* Solo imagen del logo */}
        <img className="img-fluid mb-3 logo-img " src={Heart} />
        <span className='text bs-primary-bg-subtle $azul-900 salud-vital'>Salud Vital</span>
        <h2 className="mb-3 horario-atencion">Horario de Atención</h2>
        <p>Lunes a Viernes: 7:00 am - 7:00 pm</p>
        <p>Sábados: 7:00 am - 1:00 pm</p>
        {/* Botón de agendar cita */}
        <button className="btn btn-custom mt-4">Agendar Cita</button>
        {/* Espacio para el navbar */}
        {/* <div className="mt-auto">
          <BottomNavbar/>
        </div> */}
      </div>
      
    </div>
  );
};

export default Agendar;
