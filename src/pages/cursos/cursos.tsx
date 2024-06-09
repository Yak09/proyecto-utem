import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MiniDrawer from '../../components/drawer.tsx';
import axios from 'axios';
import './Cursos.scss'; // asegúrate de crear este archivo para los estilos

import { profesorContext } from '../../hooks/profesorContext.tsx';
import { useAuth0 } from "@auth0/auth0-react";

const Cursos = () => {
  const data = useContext(profesorContext);
  const URL = import.meta.env.VITE_API_URL;
  const [cursos, setCursos] = useState([]);
  
  const { user, isLoading } = useAuth0();
  const namespace = 'https://your-namespace.com/';
  const roles = user[namespace + 'roles'] || [];
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if(roles[0] === "Profesor"){
          const response = await axios.get(`${URL}/cursos/profesor`, {
            params: { _id: roles[1] }
          });
          setCursos(response.data);
        } else {
          const response = await axios.get(`${URL}/asignaturas/alumno`, {
            params: { _id: roles[1] }
          });
          setCursos(response.data[0].cursos_info);
        }
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };
    fetchCursos();
  }, [data, roles, URL]);

  return (
    <div className="cursos-container">
      <MiniDrawer />
      <div className="cursos-content">
        <h2>Cursos</h2>
        <div className="cursos-list">
          {cursos.map((curso, index) => (
            <div key={index} className="curso-item">
              <h3>{curso.nombre}</h3>
              <p>ID del curso: {curso._id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cursos;
