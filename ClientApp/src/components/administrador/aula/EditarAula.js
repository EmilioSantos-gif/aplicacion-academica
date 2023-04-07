// src/components/EditarAreaAcademica.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../area/EditarAreaAcademica.css';
import { useNavigate } from 'react-router-dom';

const EditarAula = () => {
  const [descripcion, setDescripcion] = useState('');
  const [codigo, setCodigo] = useState('');
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = async () => {
    try {
      const response = await axios.get(`https://localhost:44360/api/aulas/${id}`);
      setDescripcion(response.data.descripcion);
      setCodigo(response.data.codigo);
      setCreditos(response.data.creditos);

    } catch (error) {
      console.error('Error fetching aula:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aulaActualizada = {
      id,
      descripcion,
      codigo,
    };

    try {
      await axios.put(`https://localhost:44360/api/aulas/${id}`, aulaActualizada);
      //history.push('/areasAcademicas');
      navigate(`/mantenimiento-aulas`)

    } catch (error) {
      console.error('Error updating aula:', error);
    }
  };

  return (
    <div className="editar-area-container">
      <h1>Editar aulas</h1>
      <form onSubmit={handleSubmit}>
        <label>Descripcion:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <label>Código:</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarAula;
