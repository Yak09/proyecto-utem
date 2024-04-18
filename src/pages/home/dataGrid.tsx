import React, { useState } from 'react';
import MiniDrawer from "../../components/drawer";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'firstName',
      headerName: 'Nombre',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Apellido',
      width: 150,
      editable: false,
    },
    {
      field: 'rut',
      headerName: 'Rut',
      width: 150,
      editable: false,
    },
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Nombre completo',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      editable: false,
    },
    // Nueva columna para presentes o ausentes
    {
      field: 'presente',
      headerName: 'Presente',
      type: 'boolean',
      width: 110,
      editable: false,
    },
  ];
  
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', rut: '123456789', age: 14, presente: true },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', rut: '987654321', age: 31, presente: false },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', rut: '456789123', age: 31, presente: true },
    { id: 4, lastName: 'Stark', firstName: 'Arya', rut: '789123456', age: 11, presente: true },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', rut: '321654987', age: null, presente: false },
    { id: 6, lastName: 'Melisandre', firstName: null, rut: '654987321', age: 150, presente: true },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', rut: '987321654', age: 44, presente: false },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', rut: '321987654', age: 36, presente: true },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', rut: '654321987', age: 65, presente: true },
];

export default function DataGridWithSearch() {
    const [filterText, setFilterText] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);

    const handleFilterChange = (event) => {
      const text = event.target.value.toLowerCase();
      const filteredData = rows.filter(row => {
          return Object.values(row).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(text)
          ) || `${row.firstName} ${row.lastName}`.toLowerCase().includes(text); // Busca en el nombre completo
      });
      setFilterText(text);
      setFilteredRows(filteredData);
  };

    const currentDate = new Date().toLocaleDateString();

    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
