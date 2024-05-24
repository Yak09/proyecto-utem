import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import  {Alumno}  from './interfaces/interfaces';
import { AlumnoContext } from './hooks/alumnoContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
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


  return (
    <AlumnoContext.Provider value={alumnoData}>
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
    </AlumnoContext.Provider>
  )
}

export default App;
