import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './App.scss';
import Home from './pages/home/Home';
import Perfil from './pages/perfil/Perfil';
import Generar from './pages/generar/Generar';
import Generar_Copy from './pages/generar/Generar';
import Escanear_copy from './pages/escanear/Escanear_copy';
import CreatePin from './pages/config/CreatePin';
import Config from './pages/config/Config';
import DataGrid from './pages/home/dataGrid';
import Cursos from './pages/cursos/cursos';
import { Alumno, Profesor } from './interfaces/interfaces';
import { AlumnoContext } from './hooks/alumnoContext';
import { profesorContext } from './hooks/profesorContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/login/login';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const namespace = 'https://your-namespace.com/'; // Asegúrate de que coincide con el namespace en la regla
  const roles = user ? (user[namespace + 'roles'] || []) : [];
  const idRole = roles.length > 1 ? roles[1] : 'sin id rol';

  const URL = import.meta.env.VITE_API_URL;


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/login" element={<Login />} />
          {/* Resto de las rutas */}
          <Route path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/DataGrid" element={isAuthenticated ? <DataGrid /> : <Navigate to="/login" />} />
          <Route path="/Perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
          <Route path="/Generar" element={isAuthenticated ? <Generar /> : <Navigate to="/login" />} />
          <Route path="/Escanear" element={isAuthenticated ? <Escanear_copy /> : <Navigate to="/login" />} />
          <Route path="/CreatePin" element={isAuthenticated ? <CreatePin /> : <Navigate to="/login" />} />
          <Route path="/Config" element={isAuthenticated ? <Config /> : <Navigate to="/login" />} />
          <Route path="/cursos" element={isAuthenticated ? <Cursos /> : <Navigate to="/login" />} />
          <Route path="/datagrid/:subject" element={isAuthenticated ? <DataGrid /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;
