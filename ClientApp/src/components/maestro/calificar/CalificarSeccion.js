import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalificarSeccion.css';

const CalificarSeccion = () => {

    const [selecciones, setSelecciones] = useState([]);
    const [calificaciones, setCalificaciones] = useState({});

    //const [puntuacion, setPuntuacion] = useState(0.00);
    const { idSeccion } = useParams();

    useEffect(() => {
        fetchSelecciones();
    }, []);

    const fetchSelecciones = async () => {
        try {
            const response = await axios.get(`https://localhost:44360/api/secciones/${idSeccion}/estudiantes`);
            setSelecciones(response.data);
            //setPuntuacion(response.data.puntuacion)
        } catch (error) {
            console.error('Error fetching secciones:', error);
        }
    };

    const handleGradeChange = (event, idEstudiante) => {
        const newGrade = event.target.value;
        setCalificaciones({
            ...calificaciones,
            [idEstudiante]: newGrade
        });
    };

    const handlePublishGrades = async () => {
        try {
            // Aquí puedes iterar sobre las calificaciones y enviarlas al servidor utilizando una llamada API
            for (const [idEstudiante, puntuacion] of Object.entries(calificaciones)) {

                console.log(`Enviando calificación para estudiante ${idEstudiante}: ${puntuacion}`);

                await axios.put(`https://localhost:44360/api/secciones/actualizar-puntuacion`, { idEstudiante, idSeccion, puntuacion });

            }
        } catch (error) {
            console.error('Error al enviar las calificaciones:', error);
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
                        <th>Puntuación</th>
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
                                    placeholder="0-100"
                                    value={calificaciones[seleccion.idEstudiante] || seleccion.puntuacion || ""}
                                    onChange={(e) => handleGradeChange(e, seleccion.idEstudiante)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handlePublishGrades}>Publicar calificaciones</button>
        </div>
    );

}

export default CalificarSeccion;