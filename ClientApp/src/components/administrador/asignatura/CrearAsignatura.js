// src/components/CrearAsignatura.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../area/CrearAreaAcademica.css';

const CrearAsignatura = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [creditos, setCreditos] = useState('');
  const [areas, setAreas] = useState([]);
  const [idAreaAcademica, setIdAreaAcademica] = useState('');
  
  let navigate = useNavigate();

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios.get('https://localhost:44360/api/areasacademicas/');
      setAreas(response.data);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaAsignatura = {
      nombre,
      codigo,
      creditos,
      idAreaAcademica
    };

    try {
      await axios.post('https://localhost:44360/api/asignaturas/', nuevaAsignatura);
      navigate(`/mantenimiento-asignaturas`)

    } catch (error) {
      console.error('Error creating asignatura:', error);
    }
  };

  return (
    <div className="crear-area-container">
      <h1>Crear nueva asignatura</h1>
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
        <label>Créditos:</label>
        <input
          type="number"
          value={creditos}
          onChange={(e) => setCreditos(e.target.value)}
        />
        <label>Área académica:</label>
        <select value={idAreaAcademica} onChange={(e) => setIdAreaAcademica(e.target.value)}>
          <option value="">--Seleccione una área académica--</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CrearAsignatura;
