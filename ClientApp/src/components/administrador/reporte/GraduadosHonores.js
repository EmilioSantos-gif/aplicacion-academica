import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../area/MantenimientoAreaAcademica.css'

const GraduadosHonores = () => {
    const [graduados, setGraduados] = useState([]);
    const [honor, setHonor] = useState('');

    useEffect(() => {
        fetchGraduados();
    }, []);

    const fetchGraduados = async () => {
        try {
            const response = await axios.get('https://localhost:44360/api/usuarios/honores');
            setGraduados(response.data);
    
            const indice = response.data.recordGeneral.indice;
    
            if (indice >= 3.8) {
                setHonor('Summa Cum Laude')
            } else if (indice >= 3.5){
                setHonor('Magna Cum Laude')
            } else {
                setHonor('Cum Laude')
            } 
        } catch (error) {
            console.log('Error fetching graduados', error)
        }
    };

    function tipoHonor(indice) {
        if (indice >= 3.8) {
            return('Summa Cum Laude')
        } else if (indice >= 3.5){
            return('Magna Cum Laude')
        } else {
            return('Cum Laude')
        } 
    };

  return (
    <div className="areas-container">
      <h1>Estudiantes graduados con honores</h1>
      <table className="areas-table">
        <thead> 
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Índice</th>
                <th>Carrera</th>
                <th>Créditos</th>
                <th>Asignaturas</th>
                <th>Honor</th>
            </tr>
        </thead>
        <tbody>
            {graduados && graduados.map((graduado) => (
                <tr key={graduado.id}>
                    <td>{graduado.usuario1}</td>
                    <td>{graduado.nombre} {graduado.apellido}</td>
                    <td>{graduado.recordGeneral.indice}</td>
                    <td>{graduado.recordGeneral.carreraNavigation.nombre}</td>
                    <td>{graduado.recordGeneral.creditosAcumulados}</td>
                    <td>{graduado.recordGeneral.asignaturasAprobadas}</td>
                    <td>{tipoHonor(graduado.recordGeneral.indice)}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default GraduadosHonores;
