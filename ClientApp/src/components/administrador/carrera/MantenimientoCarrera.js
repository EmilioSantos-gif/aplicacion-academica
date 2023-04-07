import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../area/MantenimientoAreaAcademica.css';

const MantenimientoCarrera = () => {
    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        fetchCarreras();
      }, []);

      const fetchCarreras = async () => {
        try {
          const response = await axios.get('https://localhost:44360/api/carreras');
          setCarreras(response.data);
        } catch (error) {
          console.error('Error fetching carreras:', error);
        }
      };

      return (
        <div className="areas-container">
          <h1>Carreras</h1>
          <Link to="/carreras/create">Crear nueva carrera</Link>
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
              {carreras.map((carrera) => (
                <tr key={carrera.id}>
                  <td>{carrera.id}</td>
                  <td>{carrera.nombre}</td>
                  <td>{carrera.codigo}</td>
                  <td>
                    <Link className="edit-link" to={`/carreras/edit/${carrera.id}`}>Editar</Link>
                    {' | '}
                    <button className="delete-button" onClick={() => deleteCarrera(carrera.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      async function deleteCarrera(id) {

        const confirm = window.confirm("¿Seguro que desea eliminar esta carrera?")

        if (confirm){
            try {
              await axios.delete(`https://localhost:44360/api/carreras/${id}`);
              fetchCarreras();
            } catch (error) {
              console.error('Error deleting carrera:', error);
            }
          }
        }
};

export default MantenimientoCarrera;