import { Routes, Route } from 'react-router-dom';
import Confirmacion from '../Pages/Confirmacion/Confirmacion';
import MedicalHistory from '../Pages/MedicalHistory/MedicalHistory';
import SignUp from '../Pages/SignUp/signUp.jsx'
import SignIn from '../Pages/SignIn/SignIn';
import Home from '../Pages/Home/Home';
import CitaSimple from '../Pages/CitaSimple/CitaSimple';
import Profile from '../Pages/Profile/Profile';
import AppointmentDetail from '../Pages/AppointmentDetail/AppointmentDetail';
// import AuthenticationGuard from '../componentes/auth0/AuthenticationGuard'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<SignUp/>} />
        <Route path='/signin'  element={<SignIn/>} /> */}
        <Route path='*'  element={<Home/>} />
        <Route path='/consulta/:idPaciente' element={<CitaSimple />} /> 
        <Route path='/history/:idPaciente' element={<MedicalHistory />} />
        <Route path="/consulta/detalle/:id" element={<AppointmentDetail />} /> 
        <Route path='/confirmacion' element={<Confirmacion />} /> 
        <Route path='/profile/:idPaciente' element={<Profile />} /> 
      </Routes>
    </>
  );
}

export default AppRoutes;