import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../area/CrearAreaAcademica.css';

const CrearAula = () => {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');


  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaAula = {
      descripcion,
      codigo
    };

    try {
      await axios.post('https://localhost:44360/api/aulas/', nuevaAula);
      navigate(`/mantenimiento-aulas`)

    } catch (error) {
      console.error('Error creating aula:', error);
    }
  };

  return (
    <div className="crear-area-container">
      <h1>Crear nueva aula</h1>
      <form onSubmit={handleSubmit}>
        <label>Código:</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <label>Descripcion:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CrearAula;
