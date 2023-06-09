import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './components/Login'
import MenuEstudiante from './components/estudiante/MenuEstudiante'

import { useState } from "react";

import MenuAdministrador from './components/administrador/MenuAdministrador'

import MantenimientoAreaAcademica from './components/administrador/area/MantenimientoAreaAcademica'
import CrearAreaAcademica from './components/administrador/area/CrearAreaAcademica'
import EditarAreaAcademica from './components/administrador/area/EditarAreaAcademica'

import MantenimientoAsignatura from './components/administrador/asignatura/MantenimientoAsignatura'
import CrearAsignatura from './components/administrador/asignatura/CrearAsignatura'
import EditarAsignatura from './components/administrador/asignatura/EditarAsignatura'

import MantenimientoAula from './components/administrador/aula/MantenimientoAula'
import CrearAula from './components/administrador/aula/CrearAula'
import EditarAula from './components/administrador/aula/EditarAula'

import MantenimientoCarrera from './components/administrador/carrera/MantenimientoCarrera'
import CrearCarrera from './components/administrador/carrera/CrearCarrera'
import EditarCarrera from './components/administrador/carrera/EditarCarrera'

import MantenimientoUsuario from './components/administrador/usuario/MantenimientoUsuario'
import CrearUsuario from './components/administrador/usuario/CrearUsuario'
import EditarUsuario from './components/administrador/usuario/EditarUsuario'

import MantenimientoSeccion from './components/administrador/seccion/MantenimientoSeccion'
import CrearSeccion from './components/administrador/seccion/CrearSeccion'
import EditarSeccion from './components/administrador/seccion/EditarSeccion'
import HorarioSeccion from './components/administrador/seccion/HorarioSeccion'

import GraduadosHonores from './components/administrador/reporte/GraduadosHonores'

import Secciones from './components/maestro/calificar/Secciones'
import CalificarSeccion from './components/maestro/calificar/CalificarSeccion'


function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  const handleUserAuthenticated = (usuario) => {
    setUsuarioAutenticado(usuario);
  };

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Login onUserAuthenticated={handleUserAuthenticated}/>} />
          <Route exact path="/login" element={<Login onUserAuthenticated={handleUserAuthenticated}/>} />
          <Route exact path="/estudiante" element={<MenuEstudiante usuario={usuarioAutenticado}/>} />
          <Route exact path="/administrador" element={<MenuAdministrador usuario={usuarioAutenticado}/>} />

          <Route exact path="/mantenimiento-areas" element={<MantenimientoAreaAcademica />} />
          <Route exact path="/areasAcademicas/create" element={<CrearAreaAcademica />} />
          <Route path="/areasAcademicas/edit/:id" element={<EditarAreaAcademica />} />

          <Route exact path="/mantenimiento-asignaturas" element={<MantenimientoAsignatura />} />
          <Route exact path="/asignaturas/create" element={<CrearAsignatura />} />
          <Route path="/asignaturas/edit/:id" element={<EditarAsignatura />} />

          <Route exact path="/mantenimiento-aulas" element={<MantenimientoAula />} />
          <Route exact path="/aulas/create" element={<CrearAula />} />
          <Route path="/aulas/edit/:id" element={<EditarAula />} />

          <Route exact path="/mantenimiento-carreras" element={<MantenimientoCarrera />} />
          <Route exact path="/carreras/create" element={<CrearCarrera />} />
          <Route path="/carreras/edit/:id" element={<EditarCarrera />} />

          <Route exact path="/mantenimiento-usuarios" element={<MantenimientoUsuario />} />
          <Route exact path="/usuarios/create" element={<CrearUsuario />} />
          <Route path="/usuarios/edit/:id" element={<EditarUsuario />} />

          <Route exact path="/mantenimiento-secciones" element={<MantenimientoSeccion />} />
          <Route exact path="/secciones/create" element={<CrearSeccion />} />
          <Route path="/secciones/edit/:id" element={<EditarSeccion />} />
          <Route path="/secciones/horario/:id" element={<HorarioSeccion />} />

          <Route exact path="/graduados-honores" element={<GraduadosHonores />} />

          <Route exact path="/secciones/maestro/:idMaestro" element={<Secciones />} />
          <Route exact path="/secciones/calificar/:idSeccion" element={<CalificarSeccion />} />

        </Routes>
    </Router>
    </>
  );
}

export default App;