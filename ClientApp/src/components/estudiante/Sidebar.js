// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><a href="#grades">Ver notas</a></li>
          <li><a href="#record">Ver historial académico</a></li>
          <li><a href="#select">Seleccionar materias</a></li>
          <li><a href="#retire">Retirar materias</a></li>
          <li><a href="#logout">Cerrar sesión</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
