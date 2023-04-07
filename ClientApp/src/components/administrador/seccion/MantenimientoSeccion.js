import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../area/MantenimientoAreaAcademica.css';

const MantenimientoSeccion = () => {
    const [secciones, setSecciones] = useState([]);

    useEffect(() => {
        fetchSecciones();
    }, []);

    const fetchSecciones = async () => {
        try {
            const response = await axios.get('https://localhost:44360/api/secciones');
            setSecciones(response.data);
        } catch (error) {
            console.error('Error fetching secciones:', error);
        }
    };

    return (
        <div className="areas-container">
            <h1>Secciones</h1>
            <Link to="/secciones/create">Crear nueva sección</Link>
            <table className="areas-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Asignatura</th>
                        <th>Maestro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {secciones.map((seccion) => (
                        <tr key={seccion.id}>
                            <td>{seccion.id}</td>
                            <td>{seccion.codigo}</td>
                            <td>{seccion.idAsignaturaNavigation.nombre}</td>
                            <td>{seccion.idMaestroNavigation.nombre} {seccion.idMaestroNavigation.apellido}</td>
                            <td>
                                <Link className="edit-link" to={`/secciones/edit/${seccion.id}`}>Editar</Link>
                                {' | '}
                                <button className="delete-button" onClick={() => deleteSeccion(seccion.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    async function deleteSeccion(id) {
        const confirm = window.confirm("¿Seguro que desea eliminar esta sección?");

        if (confirm) {
            try {
                await axios.delete(`https://localhost:44360/api/secciones/${id}`);
                fetchSecciones();
            } catch (error) {
                console.error('Error deleting seccion:', error);
            }
        }
    }
};

export default MantenimientoSeccion;
