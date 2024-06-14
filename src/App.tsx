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
import Cursos from './pages/cursos/cursos';
import DataGridWithAssistance from './pages/cursos/DataGridWithAssistance';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/login/login';
import MiniDrawer from './components/drawer';

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
      {isAuthenticated ? (
        <MiniDrawer>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/DataGrid" element={<DataGrid />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Generar" element={<Generar />} />
            <Route path="/Escanear" element={<Escanear_copy />} />
            <Route path="/CreatePin" element={<CreatePin />} />
            <Route path="/Config" element={<Config />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/asistencia/:cursoId" element={<DataGridWithAssistance />} />
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
