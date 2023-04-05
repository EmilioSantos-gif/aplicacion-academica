import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MateriasSeleccionadas(props) {
    const { usuario } = props;
    
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const obtenerMateriasSeleccionadas = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44360/api/seleccion/byestudiante/${usuario.id}`
        );
        const materiasSeleccionadas = response.data;
        setMaterias(materiasSeleccionadas);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerMateriasSeleccionadas();
  }, [usuario]);

  return (
    <div>
      <h2>Materias Seleccionadas</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Sección</th>
            <th>Maestro</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.IdSeccion}>
              <td>{materia.IdSeccionNavigation.IdAsignaturaNavigation.Codigo}</td>
              <td>{materia.IdSeccionNavigation.IdAsignaturaNavigation.Nombre}</td>
              <td>{materia.IdSeccionNavigation.Codigo}</td>
              <td>{materia.IdSeccionNavigation.IdMaestroNavigation.Nombre} {materia.IdSeccionNavigation.IdMaestroNavigation.Apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
