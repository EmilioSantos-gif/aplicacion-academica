import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MantenimientoSeccion.css';

const MantenimientoSeccion = () => {
    const [secciones, setSecciones] = useState([]);

    const [asignaturas, setAsignaturas] = useState([]);
    const [maestros, setMaestros] = useState([]);

    const [aulas, setAulas] = useState([]);


    const idRolMaestro = 6; 

    useEffect(() => {
        fetchSecciones();
        fetchAsignaturas();
        fetchMaestros();
        fetchAulas();
    }, []);

    const fetchSecciones = async () => {
        try {
            const response = await axios.get('https://localhost:44360/api/secciones');
            setSecciones(response.data);
        } catch (error) {
            console.error('Error fetching secciones:', error);
        }
    };

    const fetchAsignaturas = async () => {
        try {
          const response = await axios.get("https://localhost:44360/api/asignaturas");
          setAsignaturas(response.data);
        } catch (error) {
          console.error("Error fetching asignaturas:", error);
        }
      };
    
      const fetchMaestros = async () => {
        try {
          const response = await axios.get(`https://localhost:44360/api/usuarios/rol/${idRolMaestro}`);
          setMaestros(response.data);
        } catch (error) { 
          console.error("Error fetching maestros:", error);
        }
      };

      const fetchAulas = async () => {
        try {
          const response = await axios.get("https://localhost:44360/api/aulas");
          setAulas(response.data);
        } catch (error) {
          console.error("Error fetching aulas:", error);
        }
      };

    function cleanData(obj) {
        const cleanedObj = obj.filter(item => !item.hasOwnProperty('$ref'));
        return cleanedObj;
    }

    

      

    return (
        <div className="areas-container">
            <h1>Secciones</h1>
            <Link to="/secciones/create">Crear nueva sección</Link>
            <table className="areas-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Aula</th>
                        <th>Asignatura</th>
                        <th>Maestro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {secciones && secciones.length > 0 && secciones.map((seccion) => (
                        <tr key={seccion.id}>
                            <td>{seccion.id}</td>
                            <td>{seccion.codigo}</td>
                            <td>{aulas && aulas.find(aula => aula.id == seccion.aula)?.codigo}</td>
                            <td>{asignaturas && asignaturas.find(asignatura => asignatura.id == seccion.idAsignatura)?.codigo} - {asignaturas && asignaturas.find(asignatura => asignatura.id == seccion.idAsignatura)?.nombre}</td>
                            <td>{maestros && maestros.find(maestro => maestro.id == seccion.idMaestro)?.nombre} {maestros && maestros.find(maestro => maestro.id == seccion.idMaestro)?.apellido}
                            </td>
                            <td>
                                <Link className="edit-link" to={`/secciones/edit/${seccion.id}`}>Editar</Link>
                                {' | '}
                                <Link className="edit-link" to={`/secciones/horario/${seccion.id}`}>Horario</Link>
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
