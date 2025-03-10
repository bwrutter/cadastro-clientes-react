import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ListarClientes from './ListarClientes';
import useCadastroCliente from '../hooks/useCadastroCliente';
import { validateDocument } from '../utils/utils'

const CadastroCliente = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    documento: '',
  });
  const { cadastrar, loading, error } = useCadastroCliente();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const documentType = validateDocument(formData.documento)
      const tiposDocumento = { CPF: 1, CNPJ: 2 };
      formData.tipo_documento = tiposDocumento[documentType] ?? alert(documentType);
      await cadastrar(formData);
      setOpenDialog(false);
      setRefreshList((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Button onClick={() => setOpenDialog(true)} variant="outlined">
        Cadastrar Cliente
      </Button>

      <Button onClick={() => setRefreshList((prev) => !prev)} variant="outlined" style={{ marginLeft: '10px' }}>
        Listar Clientes
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cadastro de Cliente</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Telefone" name="telefone" type="tel" value={formData.telefone} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Documento" name="documento" value={formData.documento} onChange={handleChange} required sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ marginTop: '20px' }}>
        <ListarClientes key={refreshList} />
      </div>
    </Container>
  );
};

export default CadastroCliente;
