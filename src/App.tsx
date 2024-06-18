import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Perfil from './pages/perfil/Perfil';
import Generar from './pages/generar/Generar';
import Escanear_copy from './pages/escanear/Escanear_copy';
import Cursos from './pages/cursos/cursos';
import DataGridWithAssistance from './pages/cursos/DataGridWithAssistance';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/login/login';
import MiniDrawer from './components/drawer';
import AccessDenied from './pages/accesoDenegado/AccesoDenegado'; // Crea esta página para mostrar un mensaje de acceso denegado
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const namespace = 'https://your-namespace.com/';
  const roles = user ? (user[namespace + 'roles'] || []) : [];
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const getDefaultPath = () => {
    if (roles.includes('Profesor')) {
      return '/cursos';
    }
    return '/Home';
  };

  return (
    <Router>
      {isAuthenticated ? (
        <MiniDrawer>
          <Routes>
            <Route path="/" element={<Navigate to={getDefaultPath()} />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Generar" element={<Generar />} />
            <Route path="/Escanear" element={<Escanear_copy />} />
            <Route path="/cursos" element={<ProtectedRoute component={Cursos} allowedRoles={['Profesor']} />} />
            <Route path="/asistencia/:cursoId" element={<ProtectedRoute component={DataGridWithAssistance} allowedRoles={['Profesor']} />} />
            <Route path="/access-denied" element={<AccessDenied />} />
          </Routes>
        </MiniDrawer>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
