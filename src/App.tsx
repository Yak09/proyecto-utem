import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './App.scss';
import Home from './pages/home/Home';
import Perfil from './pages/perfil/Perfil';
import Generar from './pages/generar/Generar';
import Escanear_copy from './pages/escanear/Escanear_copy';
import CreatePin from './pages/config/CreatePin';
import Config from './pages/config/Config';
import DataGrid from './pages/home/dataGrid';
import SubjectSelection from './components/SubjectSelection';
import { Alumno } from './interfaces/interfaces';
import { AlumnoContext } from './hooks/alumnoContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/login/login';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [alumnoData, setAlumnoData] = useState<Alumno | null>(null);

  useEffect(() => {
    const getAlumnoData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/alumno_info", {
          params: {
            _id: "66444c94e3afe1e1f9c4e3b0"
          }
        });
        const datosDelAlumno: Alumno = response.data;
        setAlumnoData(datosDelAlumno);
      } catch (error) {
        console.error('Error al obtener los datos del alumno:', error);
      }
    };

    getAlumnoData();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <AlumnoContext.Provider value={alumnoData}>
      <Router>
        <Routes>
          {/* Redirigir directamente al login */}
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
          <Route path="/select-subject" element={isAuthenticated ? <SubjectSelection /> : <Navigate to="/login" />} />
          <Route path="/datagrid/:subject" element={isAuthenticated ? <DataGrid /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AlumnoContext.Provider>
  )
}

export default App;

{/* <AlumnoContext.Provider value={alumnoData}>
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/DataGrid" element={<DataGrid />} />
    <Route path="/Perfil" element={<Perfil />} />
    <Route path="/Generar" element={<Generar />} />
    <Route path="/Escanear" element={<Escanear_copy />} />
    <Route path="/CreatePin" element={<CreatePin />} />
    <Route path="/Config" element={<Config />} />
    <Route path="/select-subject" element={<SubjectSelection />} />
    <Route path="/datagrid/:subject" element={<DataGrid />} />
  </Routes>
</Router>
</AlumnoContext.Provider> */}
