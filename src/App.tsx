import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Button from '@mui/material/Button';
import './App.css'
import './App.scss'
import Home from './pages/home/Home';
import Perfil from './pages/perfil/Perfil'
import Sidebar from './components/Sidebar';
import Generar from './pages/generar/Generar';
import Escanear from './pages//escanear/Escanear';
import CreatePin from './pages/config/CreatePin';
import Config from './pages/config/Config';
// import { Banner } from './components/Banner';

function App() {
  return (
    <>
    <Router>
      <div className='flex'>
        <Sidebar/> 
        {/* <Banner/> */}
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Generar" element={<Generar />} />
            <Route path="/Escanear" element={<Escanear />} />
            <Route path="/CreatePin" element={<CreatePin />} />
            <Route path="/Config" element={<Config />}/>
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App;