import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CrearUsuario.css';
import { useParams } from 'react-router-dom';


const EditarUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idTipoDocumento, setIdTipoDocumento] = useState(1);
  const [noDocumento, setNoDocumento] = useState('');
  const [fchNacimiento, setFchNacimiento] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rol, setRol] = useState('');
  const [usuario1, setUsuario1] = useState('');
  const [clave, setClave] = useState('');

  const [fchRegistro, setFchRegistro] = useState('');


  const [roles, setRoles] = useState('');

  const { id } = useParams();


  let navigate = useNavigate();

  const sexoOptions = [
    {
        value: 'M',
        label: 'Masculino'
    },
    {
        value: 'F',
        label: 'Femenino'
    }
  ]

  useEffect(() => {
    fetchUsuarioyRoles();
  }, [])

  const fetchUsuarioyRoles = async () => {
    try{
        const response = await axios.get(`https://localhost:44360/api/usuarios/${id}`)
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setSexo(response.data.sexo);
        setTelefono(response.data.telefono);
        setNoDocumento(response.data.noDocumento);
        setFchNacimiento(new Date(response.data.fchNacimiento).toISOString().split('T')[0]);
        setNacionalidad(response.data.nacionalidad);
        setDireccion(response.data.direccion);
        setRol(response.data.rol);
        setUsuario1(response.data.usuario1);
        setClave(response.data.clave);

        setFchRegistro(new Date(response.data.fchRegistro))
    } catch (err) {
        console.log("Error recuperando usuario", err)
    }

    try {
        const response = await axios.get('https://localhost:44360/api/roles/');
        setRoles(response.data)
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const fchRegistroISO = new Date(fchRegistro).toISOString()

    const nuevaUsuario = {
      id,
      nombre,
      apellido,
      sexo,
      telefono,
      idTipoDocumento,
      noDocumento,
      fchNacimiento,
      nacionalidad,
      direccion,
      rol,
      usuario1,
      clave,
      fchRegistro
    };

    try {
      await axios.put(`https://localhost:44360/api/usuarios/${id}`, nuevaUsuario);
      navigate(`/mantenimiento-usuarios`)

    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setUsuario1(value);
    }
  };

  return (
    <div className="crear-area-container">
      <h1>Crear nuevo usuario</h1>
      <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div 
         style={{
            width: '300px'
          }}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <label>Sexo:</label>
        <select value ={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="">--Seleccione un sexo--</option>
            {sexoOptions && sexoOptions.map((sexo) => (
                <option key={sexo.value} value={sexo.value}>
                    {sexo.label}
                </option>
            ))}
        </select>
        <label>Teléfono:</label>
        <input
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="(809)123-4567"
            onChange={(e) => setTelefono(e.target.value)}
            value={telefono}
        />
        <label>Cédula:</label>
        <input
            type="tel"
            pattern="[0-9]{11}"
            placeholder="9-99999999-9"
            onChange={(e) => setNoDocumento(e.target.value)}
            value={noDocumento}
        />
        <label>Fecha de nacimiento:</label>
        <input
            type="date"
            value={fchNacimiento}
            onChange={(e) => setFchNacimiento(e.target.value)}
        />
        </div>
        <div
        style={{
            width: '300px'
          }}>
        <label>Nacionalidad:</label>
        <input
          type="text"
          value={nacionalidad}
          onChange={(e) => setNacionalidad(e.target.value)}
        />
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <label>Rol:</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="">--Seleccionar rol--</option>
            {roles && roles.map(rol => (
                <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                </option>
            ))}
        </select>
        <label>Usuario:</label>
        <input
            type="text"
            value={usuario1}
            onChange={handleUsernameChange}
        />
        <label>Contraseña:</label>
        <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
        />
        </div>
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditarUsuario;