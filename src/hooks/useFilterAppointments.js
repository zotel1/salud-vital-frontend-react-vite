import { useState } from "react";

const useFilterAppointments = (initialValue = {}) => {
  const [filters, setFilters] = useState(initialValue);
  const [filterResult, setFilterResult] = useState([]);
  const [responseFilter, setResponseFilter] = useState('');

  const handleFilter = (date, time, appointments) => {
  
    if (!appointments || !Array.isArray(appointments)) {
      setResponseFilter('No se encontraron resultados');
      setFilterResult([]);
      return;
    }

    // Filtrar las citas
    const filtered = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.fecha);
      const appointmentTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
     
      return (
        appointmentDate.toLocaleDateString() === date.toLocaleDateString() &&
        appointmentTime === time
      );
    });

    // Actualizar el estado
    setFilters({ date, time });
    setFilterResult(filtered);
    setResponseFilter(filtered.length ? '' : 'No se encontraron resultados');
  };

  return { filters, filterResult, responseFilter, setFilters, handleFilter };
};

export default useFilterAppointments;
