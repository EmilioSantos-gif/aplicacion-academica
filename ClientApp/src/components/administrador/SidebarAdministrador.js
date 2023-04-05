import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SidebarAdministrador.css';

const SidebarAdministrador = () => {

  let navigate = useNavigate();

  function handleNavigateComponent(component){
    navigate(`/${component}`)
  }

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li onClick={() => handleNavigateComponent('mantenimiento-asignaturas')}>Mantenimiento Asignaturas</li>
          <li><a href="#record">Mantenimiento Usuarios</a></li>
          <li><a href="#select">Mantenimiento Secciones</a></li>
          <li><a href="#retire">Mantenimiento Selecciones</a></li>
          <li><a href="#logout">Mantenimiento Carreras</a></li>
          <li onClick={() => handleNavigateComponent('mantenimiento-areas')}>Mantenimiento Areas Académias</li>
          <li><a href="#logout">Mantenimiento Aulas</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdministrador;