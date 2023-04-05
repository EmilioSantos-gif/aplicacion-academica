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

/*
import { Link } from 'react-router-dom';

<li><Link to="/grades">Ver notas</Link></li>
<li><Link to="/record">Ver historial académico</Link></li>
<li><Link to="/select">Seleccionar materias</Link></li>
<li><Link to="/retire">Retirar materias</Link></li>
<li><Link to="/logout">Cerrar sesión</Link></li>
*/