import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../area/MantenimientoAreaAcademica.css'

const MantenimientoAula = () => {
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        fetchAulas();
      }, []);

      const fetchAulas = async () => {
        try {
          const response = await axios.get('https://localhost:44360/api/aulas/');
          setAulas(response.data);
        } catch (error) {
          console.error('Error fetching aulas:', error);
        }
      };

      return (
        <div className="areas-container">
          <h1>Aulas</h1>
          <Link to="/aulas/create">Crear nueva aula</Link>
          <table className="areas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map((area) => (
                <tr key={area.id}>
                  <td>{area.id}</td>
                  <td>{area.codigo}</td>
                  <td>{area.descripcion}</td>
                  <td>
                    <Link className="edit-link" to={`/aulas/edit/${area.id}`}>Editar</Link>
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

        const confirm = window.confirm("¿Seguro que desea eliminar esta aula?")

        if (confirm){
            try {
              await axios.delete(`https://localhost:44360/api/aulas/${id}`);
              fetchAulas();
            } catch (error) {
              console.error('Error deleting area:', error);
            }
          }
        }
};

export default MantenimientoAula;