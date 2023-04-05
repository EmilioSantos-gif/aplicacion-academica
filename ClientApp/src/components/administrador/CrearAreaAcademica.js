// src/components/CrearAreaAcademica.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CrearAreaAcademica.css';

const CrearAreaAcademica = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaArea = {
      nombre,
      codigo,
    };

    try {
      await axios.post('https://localhost:44360/api/areasacademicas/', nuevaArea);
      navigate(`/mantenimiento-areas`)

    } catch (error) {
      console.error('Error creating area:', error);
    }
  };

  return (
    <div className="crear-area-container">
      <h1>Crear nueva área académica</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Código:</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CrearAreaAcademica;
