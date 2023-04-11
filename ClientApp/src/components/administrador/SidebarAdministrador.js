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
          <li onClick={() => handleNavigateComponent('mantenimiento-usuarios')}>Mantenimiento Usuarios</li>
          <li onClick={() => handleNavigateComponent('mantenimiento-secciones')}>Mantenimiento Secciones</li>
          <li><a href="#retire">Mantenimiento Selecciones</a></li>
          <li onClick={() => handleNavigateComponent('mantenimiento-carreras')}>Mantenimiento Carreras</li>
          <li onClick={() => handleNavigateComponent('mantenimiento-areas')}>Mantenimiento Areas Académias</li>
          <li onClick={() => handleNavigateComponent('mantenimiento-aulas')}>Mantenimiento Aulas</li>
          <li onClick={() => handleNavigateComponent('graduados-honores')}>Graduados con honores</li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdministrador;