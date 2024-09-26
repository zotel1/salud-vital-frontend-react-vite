
import { NavLink } from 'react-router-dom';
import './MedicalHistoryDateStyles.css'

const MedicalHistoryDate = ({id, title, doctor, date, time}) => {
  return (
    <NavLink to={`/consulta/detalle/${id}`} className='text-decoration-none w-100'>
      <div className="d-flex justify-content-between align-items-center date px-3 rounded-4 mb-2 w-100 bg-white medicalHistory">
        <div>
          <p className='headline-2 m-0 p-0'>{title}</p>
          <p className='homeDr m-0 '>{doctor}</p>
        </div>
        <div className='homeCircleDate d-flex flex-column justify-content-center'>
          <p className='headline-2 m-0'>{date}</p>
          <p className='homeTime mb-2'>{time}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default MedicalHistoryDate
