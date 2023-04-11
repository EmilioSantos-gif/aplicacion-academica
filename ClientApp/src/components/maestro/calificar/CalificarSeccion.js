import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalificarSeccion.css';

const CalificarSeccion = () => {

    const [selecciones, setSelecciones] = useState([]);
    const { idSeccion } = useParams();

    useEffect(() => {
        fetchSelecciones();
    }, []);

    const fetchSelecciones = async () => {
        try {
            const response = await axios.get(`https://localhost:44360/api/secciones/${idSeccion}/estudiantes`);
            setSelecciones(response.data);
        } catch (error) {
            console.error('Error fetching secciones:', error);
        }
    };



    return (
        <div className="areas-container">
            <h1>Estudiantes inscritos</h1>
            <table className="areas-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Letra</th>
                        <th>Calificación</th>
                    </tr>
                </thead>
                <tbody>
                    {selecciones && selecciones.map((seleccion) => (
                        <tr key={seleccion.idEstudiante}>
                            <td>{seleccion.idEstudianteNavigation.nombre} {seleccion.idEstudianteNavigation.apellido}</td>
                            <td>{seleccion.letra}</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.01"
                                    placeholder="3.50"
                                    // Aquí puedes agregar una función para manejar el cambio en la entrada de la calificación
                                    // onChange={(e) => handleGradeChange(e, seccion.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default CalificarSeccion;