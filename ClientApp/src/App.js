
/*
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import MenuEstudiante from './components/MenuEstudiante'; // Asegúrate de usar la ruta correcta

import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/login' component={Login} />
        <Route path="/estudiante" component={MenuEstudiante} />
      </Layout>
    );
  }
}
*/

//import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from "./components/Home";
import Login from './components/Login'
import MenuEstudiante from './components/estudiante/MenuEstudiante'

import { useState } from "react";


//Poner layout debajo de router

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  const handleUserAuthenticated = (usuario) => {
    setUsuarioAutenticado(usuario);
  };

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login onUserAuthenticated={handleUserAuthenticated}/>} />
          <Route exact path="/estudiante" element={<MenuEstudiante usuario={usuarioAutenticado}/>} />
        </Routes>
    </Router>
  );
}

export default App;