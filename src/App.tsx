import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Button from '@mui/material/Button';
import './App.css'
import './App.scss'
import Home from './pages/home/Home';
import Perfil from './pages/perfil/Perfil'
// import Sidebar from './components/Sidebar';
import Generar from './pages/generar/Generar';
//import Escanear from './pages//escanear/Escanear';
import Escanear_copy from './pages/escanear/Escanear_copy';
import CreatePin from './pages/config/CreatePin';
import Config from './pages/config/Config';
import DataGrid from './pages/home/dataGrid';
import SubjectSelection from './components/SubjectSelection'; // Importa el componente de selección de asignaturas
// import { Banner } from './components/Banner';

function App() {
  
  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/DataGrid" element={<DataGrid />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Generar" element={<Generar />} />
            <Route path="/Escanear" element={<Escanear_copy />} />
            <Route path="/CreatePin" element={<CreatePin />} />
            <Route path="/Config" element={<Config />}/> 
            {/* Nueva ruta para la selección de asignaturas */}
            <Route path="/select-subject" element={<SubjectSelection />} />
            {/* Ruta dinámica para el DataGrid que recibe el nombre de la asignatura como parámetro */}
            <Route path="/datagrid/:subject" element={<DataGrid />} />
          </Routes>
    </Router>
    </>
  )
}

export default App;