import React, { useState, useEffect } from "react";
import "./MenuAdministrador.css";
import axios from "axios";
import SidebarAdministrador from './SidebarAdministrador';
import Navbar from '../Navbar';

export default function MenuEstudiante(props) {
  const { usuario } = props;
  const [recordGeneral, setRecordGeneral] = useState(null);

  console.log("usuario===>", usuario);


  return (
    <div className="container">
      <SidebarAdministrador />
      <div class="menu-estudiante">
        <div class="menu-header">
          <h2>Información del Administrador</h2>
        </div>
        {usuario && <div class="info-usuario">
          <p><span>Nombre:</span> {usuario.nombre} {usuario.apellido}</p>
          <p><span>Teléfono:</span> {usuario.telefono}</p>
        </div>}
        <div class="menu-header">
          <h2>Otra seccion</h2>
        </div>
        {recordGeneral && <div class="info-record">
          <p><span>Info:</span>{50}</p>
        </div>}
    </div>
</div>
  );
}
