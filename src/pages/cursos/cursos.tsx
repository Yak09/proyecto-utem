import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Card, CardContent, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Cursos = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(1);
  const { user } = useAuth0();
  const namespace = 'https://your-namespace.com/';
  const roles = user[namespace + 'roles'] || [];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      const endpoint = roles[0] === "Profesor" ? '/cursos/profesor' : '/asignaturas/alumno';
      const params = { _id: roles[1] };
      const response = await axios.get(`${URL}${endpoint}`, { params });
      const cursosData = roles[0] === "Profesor" ? response.data : response.data[0].cursos_info;
      setCursos(cursosData);
      if (cursosData.length > 0) {
        handleCursoClick(cursosData[0]);
      }
    };
    fetchCursos();
  }, [URL, roles]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 45 },
    { field: 'nombre', headerName: 'Nombre', width: 230 },
    { field: 'carrera', headerName: 'Carrera', width: 200 },
    { field: 'correo', headerName: 'Correo', width: 170 },
    { field: 'presente', headerName: 'Presente', width: 90, renderCell: (params) => (params.value ? <CheckIcon color="success" /> : <CloseIcon color="error" />) },
  ];

  const fetchData = async (cursoId, fecha, periodo) => {
    try {
      const response = await axios.get(`${URL}/asistencia/clase`, {
        params: {
          curso_id: cursoId,
          fecha: fecha,
          periodo: periodo
        }
      });
      const data = response.data.res.map((item, index) => ({
        id: index + 1,
        nombre: item.alumno,
        carrera: item.carrera || 'N/A',
        correo: item.correo || 'N/A',
        presente: item.asistencia,
      }));
      setRows(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCursoClick = (curso) => {
    setCursoSeleccionado(curso);
    fetchData(curso._id, selectedDate, selectedPeriodo);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (cursoSeleccionado) {
      fetchData(cursoSeleccionado._id, newDate, selectedPeriodo);
    }
  };

  const handlePeriodoChange = (event) => {
    const newPeriodo = event.target.value;
    setSelectedPeriodo(newPeriodo);
    if (cursoSeleccionado) {
      fetchData(cursoSeleccionado._id, selectedDate, newPeriodo);
    }
  };

  const handleBackGenerar = () => {
    if (cursoSeleccionado) {
      navigate(`/Generar/`, { state: { selectedDate, selectedPeriodo, cursoId: cursoSeleccionado._id } });
    }
  };


  return (
    <Box sx={{ flexGrow: 1, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
      <Grid container spacing={2} sx={{backgroundColor:'#FFFFFF',borderRadius: 2}}>
        <Grid item xs={12} md={3} sx={{backgroundColor:'#e8f3ff'}} >
          {cursos.map((curso) => (
            <Box
            key={curso._id}
            sx={{
              mb: 0,
              backgroundColor: cursoSeleccionado?._id === curso._id ? 'white' : '#e8f3ff',
              borderRadius: '30px 0px 0px 30px',
              borderBottom: '1px solid #0277bd',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover::before': {
                transform: 'scaleX(1)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                zIndex: 0,
                transform: 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 0.5s ease',
                borderRadius: '30px 0px 0px 30px'
              },
              '& > *': {
                position: 'relative',
                zIndex: 1,
              },
            }}
            onClick={() => handleCursoClick(curso)}
          >
              <CardContent>
                  <Typography variant="caption">{curso.nombre}</Typography>
              </CardContent>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={9}>
          {cursoSeleccionado && (
            <>
              {/*<Typography variant="h4" gutterBottom>
                Asistencia para {cursoSeleccionado.nombre}
              </Typography>*/}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <TextField
                  id="date"
                  label="Seleccionar Fecha"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ m: 1 }}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="periodo-label">Periodo</InputLabel>
                  <Select
                    labelId="periodo-label"
                    id="periodo-select"
                    value={selectedPeriodo}
                    label="Periodo"
                    onChange={handlePeriodoChange}
                  >
                    <MenuItem value={1}>08:00 - 09:30</MenuItem>
                    <MenuItem value={2}>09:40 - 11:10</MenuItem>
                    <MenuItem value={3}>11:20 - 12:50</MenuItem>
                    <MenuItem value={4}>13:00 - 14:30</MenuItem>
                    <MenuItem value={5}>14:40 - 16:10</MenuItem>
                    <MenuItem value={6}>16:20 - 17:50</MenuItem>
                    <MenuItem value={7}>18:00 - 19:30</MenuItem>
                    <MenuItem value={8}>19:40 - 21:10</MenuItem>
                    <MenuItem value={9}>21:20 - 22:50</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, padding: '20px' }}>
                <Button variant="contained" color="secondary" onClick={handleBackGenerar}>
                  Generar QR
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cursos;
