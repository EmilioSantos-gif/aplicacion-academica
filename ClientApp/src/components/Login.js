/*
import React, { Component } from "react";
import axios from 'axios';

export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = {
        usuario: '',
        clave: '',
        errorMessage: '',
        rol: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://localhost:44360/api/usuarios/user/${this.state.usuario}`);
      const usuario = response.data;

      if (usuario.clave === this.state.clave) {
        console.log('Usuario autenticado correctamente');
        this.setState({ errorMessage: 'Usuario autenticado correctamente', rol: usuario.rol });
      } else {
        this.setState({ errorMessage: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error(error);
      this.setState({ errorMessage: 'Error al intentar autenticar al usuario' });
    }
  }

  renderAdminMenu() {
    return (
      <div>
        <p>Menu Admin</p>
      </div>
    );
  }
  
  renderMenuEstudiante() {
    return (
      <div>
        <p>Menu Estudiante</p>
      </div>
    );
  }

  render() {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" name="usuario" value={this.state.usuario} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="clave">Clave:</label>
            <input type="password" id="clave" name="clave" value={this.state.clave} onChange={this.handleChange} />
          </div>
          {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
          <button type="submit">Ingresar</button>
        </form>
        {this.state.rol === 1 ? this.renderMenuEstudiante() : this.renderAdminMenu()}
      </div>
    );
  }
}
*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";


const Login = ({ onUserAuthenticated }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "usuario") {
      setUsuario(value);
    } else if (name === "clave") {
      setClave(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://localhost:44360/api/usuarios/user/${usuario}`
      );
      const usuarioData = response.data;

      if (usuarioData.clave === clave) {
        console.log("Usuario autenticado correctamente");
        setErrorMessage("Usuario autenticado correctamente");

        onUserAuthenticated(usuarioData);

        //localStorage.
        //roles
        //1 = estudiante
        if (usuarioData.rol == 1) {
            console.log("navegando a estudiante")
            navigate('/estudiante');
        } else if (usuarioData.rol == 2){
            navigate('/maestro');
        } else if (usuarioData.rol == 3){
            navigate('/admin');
        }

      } else {
        setErrorMessage("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al intentar autenticar al usuario");
    }
  };

  return (
    <div class="login-form">
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <div class="form-group">
        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={usuario}
          onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label htmlFor="clave">Clave:</label>
        <input
          type="password"
          id="clave"
          name="clave"
          value={clave}
          onChange={handleChange}
        />
      </div>
      {errorMessage && <div class="error">{errorMessage}</div>}
      <button type="submit">Ingresar</button>
    </form>
  </div>
  );
};

export default Login;