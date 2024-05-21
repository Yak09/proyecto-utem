import React, { useState, useEffect } from 'react';
import MiniDrawer from "../../components/drawer";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import Container from "@mui/material/Container";
import axios from 'axios';

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
    field: 'telefono',
    headerName: 'Teléfono',
    width: 150,
    editable: false,
  },
  {
    field: 'presente',
    headerName: 'Presente',
    type: 'boolean',
    width: 110,
    editable: false,
  },
];

export default function DataGridWithSearch() {
  const [filterText, setFilterText] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const location = useLocation();
  const qrData = location.state ? location.state.qrData : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/alumnos');
        const data = response.data.map((alumno, index) => ({
          id: index + 1,
          nombre: alumno.nombre,
          carrera: alumno.carrera,
          correo: alumno.correo,
          telefono: alumno.telefono,
          presente: false,
        }));
        setRows(data);
        setFilteredRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (qrData) {
      const updatedRows = rows.map(row => {
        if (row.nombre === qrData) {
          return { ...row, presente: true };
        }
        return row;
      });
      setFilteredRows(updatedRows);
    }
  }, [qrData, rows]);

  const handleFilterChange = (event) => {
    const text = event.target.value.toLowerCase();
    const filteredData = rows.filter(row => {
      return Object.values(row).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(text)
      );
    });
    setFilterText(text);
    setFilteredRows(filteredData);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <Box sx={{ margin: "auto", textAlign: "center" }}>
        <h1>{qrData}</h1>
      </Box>
      <MiniDrawer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Buscador"
          value={filterText}
          onChange={handleFilterChange}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <div style={{ padding: '8px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
          {currentDate}
        </div>
      </div>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
