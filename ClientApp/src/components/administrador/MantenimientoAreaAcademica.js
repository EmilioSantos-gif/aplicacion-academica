import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MantenimientoAreaAcademica.css'

const MantenimientoAreaAcademica = () => {
    const [areas, setAreas] = useState([]);

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

      return (
        <div className="areas-container">
          <h1>Áreas académicas</h1>
          <Link to="/areasAcademicas/create">Crear nueva área académica</Link>
          <table className="areas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area.id}>
                  <td>{area.id}</td>
                  <td>{area.nombre}</td>
                  <td>{area.codigo}</td>
                  <td>
                    <Link className="edit-link" to={`/areasAcademicas/edit/${area.id}`}>Editar</Link>
                    {' | '}
                    <button className="delete-button" onClick={() => deleteArea(area.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      async function deleteArea(id) {

        const confirm = window.confirm("¿Seguro que desea eliminar esta area académica?")

        if (confirm){
            try {
              await axios.delete(`https://localhost:44360/api/areasacademicas/${id}`);
              fetchAreas();
            } catch (error) {
              console.error('Error deleting area:', error);
            }
          }
        }
};

export default MantenimientoAreaAcademica;