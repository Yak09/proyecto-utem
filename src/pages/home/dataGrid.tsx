import React, { useState, useEffect } from 'react';
import MiniDrawer from "../../components/drawer";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

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
  const URL = import.meta.env.VITE_API_URL;
  const [filterText, setFilterText] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const location = useLocation();
  const qrData = location.state ? location.state.qrData_ : '';

  const [asignatura, setAsignatura] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL+"/alumnos");
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
      try {
        //const qrJson = JSON.parse(qrData);
        const nombreAlumno = qrData.nombre_alumno;
        const nombreAsignatura = qrData.nombre_asignatura;
        const horarioAsignatura = qrData.periodo;

        setAsignatura(nombreAsignatura);
        setHorario(horarioAsignatura);

        let found = false;
        const updatedRows = rows.map(row => {
          if (row.nombre === nombreAlumno) {
            found = true;
            return { ...row, presente: true };
          }
          return row;
        });

        if (found) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: `Alumno ${nombreAlumno} marcado como presente para ${nombreAsignatura} (${horarioAsignatura})`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Alumno no encontrado',
            text: `El alumno ${nombreAlumno} no está registrado.`,
          });
        }

        setFilteredRows(updatedRows);
      } catch (error) {
        console.error('Error parsing QR data:', error);
      }
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
        <h3>{asignatura}</h3>
        <h3>{horario}</h3>
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
