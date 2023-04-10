import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import './CrearSeccion.css';

export default function HorarioSeccion() {

  const { id } = useParams();

  const [horarios, setHorarios] = useState([{idSeccion:id, diaSemana: '', horaInicio: '', horaFin: '' }]);
  const [error, setError] = useState(null);

  let navigate = useNavigate();


  useEffect(() => {
    fetchHorarios();
  }, [])

  const fetchHorarios = async () => {
    const response = await axios.get(`https://localhost:44360/api/horarios/seccion/${id}`)
/*
    const horariosData = response.data.map(h => {
      h.horaInicio = formatTime(h.horaInicio);
      h.horaFin = formatTime(h.horaFin);
      return h;
    });
*/
    setHorarios(response.data)
  }

  function formatTime(timeObj) {
    const hours = timeObj.hours.toString().padStart(2, "0");
    const minutes = timeObj.minutes.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const agregarHorario = () => {
    setHorarios([...horarios, {idSeccion:id, diaSemana: '', horaInicio: '', horaFin: '' }]);
  };

  const actualizarHorario = (index, key, value) => {
    const newHorarios = [...horarios];
    newHorarios[index][key] = value;
    setHorarios(newHorarios);
  };

  const handleSubmit = async (e) => {
    console.log("Submiting========================>")
    e.preventDefault();
    //primero borro los horarios que tenia

    try {

        try {
          await axios.delete(`https://localhost:44360/api/horarios/seccion/${id}`)
        } catch(error) {
          console.log("Error eliminando horarios", error)
        }
    
        for (const horario of horarios){
            await axios.post(`https://localhost:44360/api/horarios/`, horario)
        }
        navigate('/mantenimiento-secciones');

    } catch (error) {
        setError("Este horario ya está ocupado en el aula de la sección seleccionada. Por favor, elige otro horario o cambie el aula.");
        console.log("Error grabando horarios", error)
    }

  };

  return (
    <div className="crear-seccion-container">
    {error && <Alert severity="error">{error}</Alert>}
    <h1>Horarios</h1>
      <form onSubmit={handleSubmit}>

      {
        horarios.map((horario, index) => (
        <div key={index}>
            <label>Día de la semana:</label>
            <select
                value={horario.diaSemana}
                onChange={(e) => actualizarHorario(index, 'diaSemana', e.target.value)}>
                <option value="">Selecciona un día</option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>
            </select>

            <label>Hora de inicio:</label>
            <input className="dtpInput"
                type="time"
                value={horario.horaInicio}
                onChange={(e) => actualizarHorario(index, 'horaInicio', e.target.value)}
            />

            <label>Hora de fin:</label>
            <input className="dtpInput"
                type="time"
                value={horario.horaFin}
                onChange={(e) => actualizarHorario(index, 'horaFin', e.target.value)}
            />
        </div>
        ))
      }
        <button type="button" className="horarioButton" onClick={agregarHorario}>Agregar horario</button>
        
        <button className="submitButton" type="submit">Actualizar</button>

      </form>
    </div>
  )
}
