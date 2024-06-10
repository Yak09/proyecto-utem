import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MiniDrawer from "../../components/drawer";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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
  const URL = import.meta.env.VITE_API_URL;
  const [rows, setRows] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0]; // Fecha en formato ISO sin la hora

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/asistencia/clase`, {
          params: {
            curso_id: cursoId,
            fecha: currentDate
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

    fetchData();
  }, [cursoId, currentDate, URL]);

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <MiniDrawer />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
