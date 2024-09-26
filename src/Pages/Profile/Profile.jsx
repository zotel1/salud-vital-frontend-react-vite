
import BottomNavbar from '../shared/BottomNavbar/BottomNavbar'
import Header from '../shared/header/Header'
import profileImg from '../../assets/img/profileImg.png'
import './ProfileStyle.css'
import useGetPacientesById from '../../hooks/useGetPacientesById'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'


const Profile = () => {
  const {paciente, loading, error} = useGetPacientesById();

  if (error) return <p>Error: {error.message}</p>;

  const direccion = paciente?.direccion || {};
  const {calle = '', numero='', complemento='', distrito='', ciudad=''} = direccion;

  return (
    <div className="vh-100 d-flex flex-column position-relative">
      <Header/>
      <div className='flex-grow-1'>
        {error ? (
          <p>Error al cargar las citas: {error}</p>
        ):(
          <>
          <div className='d-flex flex-column align-items-center '>
            {loading && <Spinner animation="border" variant="warning" role="status"/>}
          </div>
            {!loading && !error && paciente && (
              <div className="flex-grow-1 overflow-auto profileContent">
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img className='profileImg' src={profileImg} alt="Profile picture" />
                    <p className='profileName'>{paciente?.nombre}</p>      
                </div>
                <p><b>Información Personal</b></p>
                <label htmlFor="">Nombre completo</label><input className='personalInfo' type="text" name="" id="" value={paciente?.nombre || 'nada'} disabled/>
                <label htmlFor="">Direccion</label><input className='personalInfo' type="text" name="" id="" value={`${calle} ${numero} ${complemento}, ${distrito}, ${ciudad}`} disabled/>
                <label htmlFor="">Número de documento</label><input className='personalInfo' type="text" name="" id="" value={paciente?.documento || 'nada'} disabled/>
                <label htmlFor="">Número de teléfono</label><input className='personalInfo' type="text" name="" id="" value={paciente?.telefono || 'nada'} disabled/>
              </div>
            )}
          
          </>
          
        )}

      </div>
      <BottomNavbar className='position-fixed bottom-0 w-100'/>
    </div>
  )
}

export default Profile
