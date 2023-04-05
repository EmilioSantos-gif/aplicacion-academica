// Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/student-menu">Menú del estudiante</a></li>
          <li><a href="/about">Acerca de</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
