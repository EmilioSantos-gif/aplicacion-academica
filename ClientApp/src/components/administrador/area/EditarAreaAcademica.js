// src/components/EditarAreaAcademica.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './EditarAreaAcademica.css';
import { useNavigate } from 'react-router-dom';

const EditarAreaAcademica = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const { id } = useParams();
  //const history = useHistory();
  let navigate = useNavigate();


  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = async () => {
    try {
      const response = await axios.get(`https://localhost:44360/api/areasacademicas/${id}`);
      setNombre(response.data.nombre);
      setCodigo(response.data.codigo);
    } catch (error) {
      console.error('Error fetching area:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const areaActualizada = {
      nombre,
      codigo,
      id
    };

    try {
      await axios.put(`https://localhost:44360/api/areasacademicas/${id}`, areaActualizada);
      //history.push('/areasAcademicas');
      navigate(`/mantenimiento-areas`)

    } catch (error) {
      console.error('Error updating area:', error);
    }
  };

  return (
    <div className="editar-area-container">
      <h1>Editar área académica</h1>
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
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarAreaAcademica;
