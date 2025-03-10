import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useListarClientes from '../hooks/useListarClientes';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nome', headerName: 'Nome', width: 200, editable: true },
  { field: 'email', headerName: 'Email', width: 250, editable: true },
  { field: 'telefone', headerName: 'Telefone', width: 150, editable: true },
  { field: 'documento', headerName: 'Documento', width: 200, editable: true },
];

const ListarClientes = () => {
  const { clientes, loading, error } = useListarClientes();

  if (loading) {
    return (
      <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Carregando...
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'error.main' }}>
        {error}
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={clientes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ListarClientes;
