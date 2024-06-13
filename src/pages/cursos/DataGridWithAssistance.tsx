import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MiniDrawer from "../../components/drawer";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200,
    editable: false,
  },
  {
    field: 'carrera',
    headerName: 'Carrera',
    width: 200,
    editable: false,
  },
  {
    field: 'correo',
    headerName: 'Correo',
    width: 250,
    editable: false,
  },
  {
    field: 'presente',
    headerName: 'Presente',
    width: 110,
    editable: false,
    renderCell: (params) => (
      params.value ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />
    ),
  },
];

export default function DataGridWithAssistance() {
  const { cursoId } = useParams();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [curso,setCurso] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Fecha inicial en formato ISO sin la hora
  const [selectedPeriodo, setSelectedPeriodo] = useState(1); // Periodo inicial por defecto
  
  const fetchCurso = async() =>{
    try {
      const response_curso = await axios.get(URL+"/asignatura/info",{
        params: {
          curso_id: cursoId,
        }
      });
      setCurso(response_curso.data[0].nombre);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchData = async (fecha, periodo) => {
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
  

  useEffect(() => {
    fetchCurso();
    fetchData(selectedDate, selectedPeriodo);  

  }, [cursoId, selectedDate, selectedPeriodo, URL]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    fetchData(newDate, selectedPeriodo);
  };

  const handlePeriodoChange = (event) => {
    const newPeriodo = event.target.value;
    setSelectedPeriodo(newPeriodo);
    fetchData(selectedDate, newPeriodo);
  };

  const handleBackClick = () => {
    navigate(`/cursos/`); 
  };

  const handleBackGenerar = () => {
    navigate(`/Generar/`, { state: { selectedDate, selectedPeriodo, cursoId } });
  };

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <MiniDrawer />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Typography variant="h3" gutterBottom>
            {curso}
          </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Regresar
        </Button>
      </Box>
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
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="periodo-label">Periodo</InputLabel>
          <Select
            labelId="periodo-label"
            id="periodo"
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
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, padding: '20px' }}>
        <Button variant="contained" color="secondary" onClick={handleBackGenerar}>
          Generar QR
        </Button>
      </Box>
    </Box>
  );
}
