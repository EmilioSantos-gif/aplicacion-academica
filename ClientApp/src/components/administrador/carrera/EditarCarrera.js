// src/components/EditarAreaAcademica.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../area/EditarAreaAcademica.css';
import { useNavigate } from 'react-router-dom';

const EditarCarrera = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const { id } = useParams();
  const [areas, setAreas] = useState([]);
  const [idAreaAcademica, setIdAreaAcademica] = useState('');
  
  let navigate = useNavigate();

  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = async () => {
    try {
      const response = await axios.get(`https://localhost:44360/api/carreras/${id}`);
      setNombre(response.data.nombre);
      setCodigo(response.data.codigo);
      setIdAreaAcademica(response.data.idAreaAcademica)
    } catch (error) {
      console.error('Error fetching carrera:', error);
    }

    try {
      const response = await axios.get('https://localhost:44360/api/areasacademicas/');
      setAreas(response.data);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carreraActualizada = {
      id,
      nombre,
      codigo,
      idAreaAcademica
    };

    try {
      await axios.put(`https://localhost:44360/api/carreras/${id}`, carreraActualizada);
      navigate(`/mantenimiento-carreras`)

    } catch (error) {
      console.error('Error updating carrera:', error);
    }
  };

  return (
    <div className="editar-area-container">
      <h1>Editar carreras</h1>
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
        <label>Área académica:</label>
        <select value={idAreaAcademica} onChange={(e) => setIdAreaAcademica(e.target.value)}>
          <option value="">--Seleccione una área académica--</option>
          {areas && areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarCarrera;
