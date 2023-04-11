//recuerda filtrarlos por periodo

//1. mostrar secciones asignadas al maestro
//2. al hacer click en seccion lleva a pagina con estudiantes de la seccion
//  con un campo para calificar cada estudiante
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../administrador/seccion/MantenimientoSeccion.css';

const Secciones = () => {
    const [secciones, setSecciones] = useState([]);
    const { idMaestro } = useParams();

    useEffect(() => {
        fetchSecciones();
    }, []);

    const fetchSecciones = async () => {
        try {
            const response = await axios.get(`https://localhost:44360/api/secciones/maestro/${idMaestro}`);
            setSecciones(response.data);
        } catch (error) {
            console.error('Error fetching secciones:', error);
        }
    };

    return (
        <div className="areas-container">
            <h1>Secciones asignadas</h1>
            <table className="areas-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Asignatura</th>
                        <th>Aula</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {secciones && secciones.map((seccion) => (
                        <tr key={seccion.id}>
                            <td>{seccion.codigo}</td>
                            <td>{seccion.asignatura}</td>
                            <td>{seccion.aula}</td>
                            <td>{seccion.capacidad}</td>
                            <td><Link className="edit-link" to={`/secciones/calificar/${seccion.id}`}>Calificar</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Secciones;
