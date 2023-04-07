import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MantenimientoAsignatura.css'

const MantenimientoAsignatura = () => {
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
        fetchAsignaturas();
      }, []);

      const fetchAsignaturas = async () => {
        try {
          const response = await axios.get('https://localhost:44360/api/asignaturas');
          setAsignaturas(response.data);
        } catch (error) {
          console.error('Error fetching asignaturas:', error);
        }
      };

      return (
        <div className="asignaturas-container">
          <h1>Asignaturas</h1>
          <Link to="/asignaturas/create">Crear nueva asignatura</Link>
          <table className="asignaturas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Créditos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaturas.map((asignatura) => (
                <tr key={asignatura.id}>
                  <td>{asignatura.id}</td>
                  <td>{asignatura.nombre}</td>
                  <td>{asignatura.codigo}</td>
                  <td>{asignatura.creditos}</td>
                  <td>
                    <Link className="edit-link" to={`/asignaturas/edit/${asignatura.id}`}>Editar</Link>
                    {' | '}
                    <button className="delete-button" onClick={() => deleteAsignatura(asignatura.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      async function deleteAsignatura(id) {

        const confirm = window.confirm("¿Seguro que desea eliminar esta asignatura?")

        if (confirm){
            try {
              await axios.delete(`https://localhost:44360/api/asignaturas/${id}`);
              fetchAsignaturas();
            } catch (error) {
              console.error('Error deleting asignatura:', error);
            }
          }
        }
};

export default MantenimientoAsignatura;