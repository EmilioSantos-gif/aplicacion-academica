import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../area/MantenimientoAreaAcademica.css'

const MantenimientoUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [rol, setRol] = useState([]);


    useEffect(() => {
        fetchUsuarios();
      }, []);

      const fetchUsuarios = async () => {
        try {
          const response = await axios.get('https://localhost:44360/api/usuarios');
          console.log("responseUsuarios=====>",response)
          setUsuarios(response.data);
          console.log("usuarios=====>",usuarios)

        } catch (error) {
          console.error('Error fetching usuarios:', error);
        }

        try {
            const response = await axios.get(`https://localhost:44360/api/roles/`);
            console.log("responseRol=====>",response)
            setRol(response.data)
            console.log("rol=====>",rol)
        } catch (error) {
            console.log("Error al recuperar roles", error)
        }
      };

      return (
        <div className="areas-container">
          <h1>Usuarios</h1>
          <Link to="/usuarios/create">Crear nuevo usuario</Link>
          <table className="areas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre} {usuario.apellido}</td>
                  <td>{rol.length && rol.filter(r => r.id == usuario.rol)[0].nombre}</td>
                  <td>
                    <Link className="edit-link" to={`/usuarios/edit/${usuario.id}`}>Editar</Link>
                    {' | '}
                    <button className="delete-button" onClick={() => deleteUsuario(usuario.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      async function deleteUsuario(id) {

        const confirm = window.confirm("¿Seguro que desea eliminar esta usuario?")

        if (confirm){
            try {
              await axios.delete(`https://localhost:44360/api/usuarios/${id}`);
              fetchUsuarios();
            } catch (error) {
              console.error('Error deleting usuario:', error);
            }
          }
        }
};

export default MantenimientoUsuario;