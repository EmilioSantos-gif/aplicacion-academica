import React, { useState, useEffect } from "react";
import "./MenuEstudiante.css";
import axios from "axios";
import { Doughnut  } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from './Sidebar';
import Navbar from '../Navbar';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MenuEstudiante(props) {
  const { usuario } = props;
  const [recordGeneral, setRecordGeneral] = useState(null);

  console.log("usuario===>", usuario);

  useEffect(() => {
    const fetchRecordGeneral = async () => {
      try {
        const response = await fetch(
          `https://localhost:44360/api/recordgeneral/byestudiante/${usuario.id}`
        );
        const data = await response.json();
        console.log("recordgeneral====>", data);
        setRecordGeneral(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecordGeneral();
  }, []);

  const indiceData = {
    labels: ['Índice General', 'Faltante'],
    datasets: [
      {
        data: [3, 1],
        backgroundColor: ['#36A2EB', '#E0E0E0'],
      },
    ],
  };

  return (
    <div className="container">
      <Sidebar />
      <div class="menu-estudiante">
        <div class="menu-header">
          <h2>Información del Estudiante</h2>
        </div>
        {usuario && <div class="info-usuario">
          <p><span>Nombre:</span> {usuario.nombre} {usuario.apellido}</p>
          <p><span>Teléfono:</span> {usuario.telefono}</p>
        </div>}
        <div class="menu-header">
          <h2>Récord General</h2>
        </div>
        {recordGeneral && <div class="info-record">
          <p><span>Carrera:</span> {recordGeneral.carrera}</p>
          <p><span>Índice General:</span> {recordGeneral.indice}</p>
          <p><span>Créditos Acumulados:</span> {recordGeneral.creditosAcumulados}</p>
          <p><span>Asignaturas Aprobadas:</span> {recordGeneral.asignaturasAprobadas}</p>
          <p><span>Cantidad de Trimestres:</span> {recordGeneral.cantidadTrimestres}</p>
        </div>}
        <div className="indice-chart">
        <Doughnut
  data={indiceData}
  options={{
    cutout: '75%',
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      afterDraw: function (chart, args, options) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;

        ctx.restore();
        ctx.font = "bold 20px Arial";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#666";

        var text = (indiceData.datasets[0].data[0] * 100).toFixed(0) + "%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  }}
/>

        </div>
    </div>
</div>
  );
}

/*
      
      
      
      <p>Correo: {usuario.correo}</p>
 */
