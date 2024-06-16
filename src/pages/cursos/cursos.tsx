import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, CardActionArea, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MiniDrawer from '../../components/drawer';
import axios from 'axios';
import './Cursos.scss';


import { useAuth0 } from "@auth0/auth0-react";

const Cursos = () => {

  const URL = import.meta.env.VITE_API_URL;
  const [cursos, setCursos] = useState([]);
  
  const { user, isLoading } = useAuth0();
  const namespace = 'https://your-namespace.com/';
  const roles = user[namespace + 'roles'] || [];
  
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const endpoint = roles[0] === "Profesor" ? '/cursos/profesor' : '/asignaturas/alumno';
        const params = { _id: roles[1] };
        const response = await axios.get(`${URL}${endpoint}`, { params });
        const cursosData = roles[0] === "Profesor" ? response.data : response.data[0].cursos_info;
        setCursos(cursosData);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };
    fetchCursos();
  }, [roles, URL]);

  const handleCursoClick = (cursoId) => {
    navigate(`/asistencia/${cursoId}`);
  };

  return (
    <div className="cursos-container">
      {/* <MiniDrawer /> */}
      <AppBar position="static" sx={{ backgroundColor: '#35BBAE' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ffffff' }}>
            Cursos {roles[0]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2}}>
        <Grid container spacing={2}>
          {cursos.map((curso, index) => (
            <Grid item xs={6} sm={6} md={6} key={index}>
              <Card sx={{ backgroundColor: '#eeeeee', boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , padding:'5px' }}>
                  <Typography variant="h8" component="div" sx={{ flexGrow: 1, color: '#123456' }}>
                    {curso.nombre}
                  </Typography>
                  <IconButton aria-label="search" onClick={() => handleCursoClick(curso._id)} sx={{ color: '#123456' }}>
                    <SearchIcon />
                  </IconButton>
                </CardContent>
                <CardActionArea onClick={() => handleCursoClick(curso._id)}>
                  <Box sx={{ height: '100%', width: '100%' }}></Box> {/* Invisible overlay for clicking */}
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Cursos;
