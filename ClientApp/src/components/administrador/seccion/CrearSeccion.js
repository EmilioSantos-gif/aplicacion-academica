import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import './CrearSeccion.css';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const CrearSeccion = () => {
  const [codigo, setCodigo] = useState('');
  const [idAsignatura, setIdAsignatura] = useState(null);
  const [idMaestro, setIdMaestro] = useState(null);
  const [capacidad, setCapacidad] = useState('');
  const [aula, setAula] = useState(null);
  const [periodo, setPeriodo] = useState(null);

  const [asignaturas, setAsignaturas] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [periodos, setPeriodos] = useState([]);  

  const [error, setError] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    fetchAsignaturas();
    fetchMaestros();
    fetchAulas();
    fetchPeriodos();
  }, []);

  const idRolMaestro = 6;

  const fetchAsignaturas = async () => {
    try {
      const response = await axios.get("https://localhost:44360/api/asignaturas");
      setAsignaturas(response.data);
    } catch (error) {
      console.error("Error fetching asignaturas:", error);
    }
  };

  const fetchMaestros = async () => {
    try {
      const response = await axios.get(`https://localhost:44360/api/usuarios/rol/${idRolMaestro}`);
      setMaestros(response.data);
    } catch (error) { 
      console.error("Error fetching maestros:", error);
    }
  };

  const fetchAulas = async () => {
    try {
      const response = await axios.get("https://localhost:44360/api/aulas");
      setAulas(response.data);
    } catch (error) {
      console.error("Error fetching aulas:", error);
    }
  };

  const fetchPeriodos = async () => {
    try {
      const response = await axios.get("https://localhost:44360/api/periodos");
      setPeriodos(response.data);
    } catch (error) {
      console.error("Error fetching periodos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaSeccion = {
        codigo,
        idAsignatura: idAsignatura,
        idMaestro: idMaestro,
        capacidad,
        aula: aula,
        periodo: periodo,
        codigo
    };

    try {
        await axios.post('https://localhost:44360/api/secciones/', nuevaSeccion);
        navigate('/mantenimiento-secciones');
    } catch (error) {
        console.error('Error creating seccion:', error);
        setError("No se pudo guardar la sección. Por favor, inténtalo de nuevo.");

    }
};

  return (
    <div className="crear-seccion-container">
      {error && <Alert severity="error">{error}</Alert>}
      <h1>Crear nueva sección</h1>
        <form onSubmit={handleSubmit}>
          <label>Asignatura:</label>
          <Autocomplete
            options={asignaturas}
            getOptionLabel={(option) => (option.codigo + " - " + option.nombre)}
            onChange={(event, value) => setIdAsignatura(value ? value.id : "")}
            width="1px"
            renderInput={(params) => (
              <TextField {...params} />
            )}
            sx={{
              "& .MuiInputBase-input": {
                height: "10px", 
              }
            }}
          />
          <label>Maestro:</label>
          <Autocomplete
            options={maestros}
            getOptionLabel={(option) => `${option.noDocumento} - ${option.nombre} ${option.apellido}`}
            onChange={(event, value) => setIdMaestro(value ? value.id : "")}
            renderInput={(params) => (
              <TextField {...params}/>
            )}
            sx={{
              "& .MuiInputBase-input": {
                height: "10px", 
              }
            }}
          />
          <label>Capacidad:</label>
          <TextField
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 0, step: 1 } }}
            sx={{
              "& .MuiInputBase-input": {
                height: "10px", 
              }
            }}
          />
          <label>Aula:</label>
          <Autocomplete
            options={aulas}
            getOptionLabel={(option) => (option.codigo + " - " + option.descripcion)}
            onChange={(event, value) => setAula(value ? value.id : "")}
            renderInput={(params) => (
              <TextField {...params} />
              )}
            sx={{
              "& .MuiInputBase-input": {
                height: "10px", 
              }
            }}
          />
          <label>Periodo:</label>
          <Autocomplete
            options={periodos}
            getOptionLabel={(option) => option.desPeriodo}
            onChange={(event, value) => setPeriodo(value ? value.id : "")}
            renderInput={(params) => (
              <TextField {...params} />
            )}
            sx={{
              "& .MuiInputBase-input": {
                height: "10px", 
              }
            }}
          />
          <label>Código:</label>
          <TextField
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                height: "10px",
              }
            }}
          />
        <button className="submitButton" type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CrearSeccion;

/*

  const [horarios, setHorarios] = useState([{ diaSemana: '', horaInicio: '', horaFin: '' }]);

  const agregarHorario = () => {
    setHorarios([...horarios, { diaSemana: '', horaInicio: '', horaFin: '' }]);
  };

  const actualizarHorario = (index, key, value) => {
    const newHorarios = [...horarios];
    newHorarios[index][key] = value;
    setHorarios(newHorarios);
  };

          {
          horarios.map((horario, index) => (
            <div key={index}>
              <label>Día de la semana:</label>
              <select
                value={horario.diaSemana}
                onChange={(e) => actualizarHorario(index, 'diaSemana', e.target.value)}
              >
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
        <button className="horarioButton" onClick={agregarHorario}>Agregar horario</button>

*/
