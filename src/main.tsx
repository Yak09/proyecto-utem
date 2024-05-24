import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from './App.tsx'

import './index.css'
import { Alumno } from './interfaces/interfaces.tsx';
import { AlumnoContext } from './hooks/alumnoContext.tsx';


const theme = createTheme({
  palette: {
    primary: {
      main: '#00ACAC', 
    },
    secondary: {
      main: '#6D5CAE', 
    },
  },
});

const alumno: Alumno = {
  _id: '123456',
  carrera: 'Ingeniería en Sistemas',
  correo: 'alumno@ejemplo.com',
  nombre: 'Juan Pérez',
  telefono: '123-456-7890'
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AlumnoContext.Provider value={alumno}>
        <App />
      </AlumnoContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
