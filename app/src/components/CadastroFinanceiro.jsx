import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  DialogContentText
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ptBR from 'date-fns/locale/pt-BR';
import { addMonths, format } from 'date-fns';
import useContas from '../hooks/useContas';

const CadastroFinanceiro = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [contaParaEditar, setContaParaEditar] = useState(null);
  const [contas, setContas] = useState([]);
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    tipo: 'SIMPLES',
    data_vencimento: null,
    quantidade_meses: ''
  });

  // Estado para o diálogo de confirmação de pagamento
  const [confirmacaoPagamento, setConfirmacaoPagamento] = useState({
    open: false,
    conta: null
  });

  const { cadastrarConta, listarContas, excluirConta, atualizarStatusConta, loading, error } = useContas();

  const loadContas = async () => {
    try {
      const data = await listarContas();
      setContas(data);
    } catch (err) {
      console.error('Erro ao carregar contas:', err);
    }
  };

  useEffect(() => {
    loadContas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (conta) => {
    setContaParaEditar(conta);
    setFormData({
      ...conta,
      data_vencimento: new Date(conta.data_vencimento)
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
      try {
        await excluirConta(id);
        loadContas();
      } catch (err) {
        console.error('Erro ao excluir conta:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosBase = {
        ...formData,
        valor: Number(formData.valor),
        data_vencimento: formData.data_vencimento.toISOString().split('T')[0]
      };

      if (formData.tipo === 'MENSAL' && Number(formData.quantidade_meses) > 1) {
        // Criar registros para cada mês
        const promessas = [];
        const dataBase = new Date(formData.data_vencimento);
        const quantidadeMeses = Number(formData.quantidade_meses);

        for (let i = 0; i < quantidadeMeses; i++) {
          const novaData = addMonths(dataBase, i);
          const novaConta = {
            ...dadosBase,
            descricao: `${formData.descricao} (${i + 1}/${quantidadeMeses})`,
            data_vencimento: format(novaData, 'yyyy-MM-dd'),
            tipo: 'SIMPLES', // Cada parcela é tratada como conta simples
            quantidade_meses: null // Não precisa desta informação nas parcelas
          };
          promessas.push(cadastrarConta(novaConta));
        }

        await Promise.all(promessas);
      } else {
        // Para contas simples ou mensais de parcela única
        await cadastrarConta(dadosBase);
      }
      
      setOpenDialog(false);
      setContaParaEditar(null);
      await loadContas();
      setFormData({
        descricao: '',
        valor: '',
        tipo: 'SIMPLES',
        data_vencimento: null,
        quantidade_meses: ''
      });
    } catch (err) {
      console.error('Erro ao cadastrar conta:', err);
    }
  };

  const handleToggleStatus = async (conta) => {
    if (conta.status === 'PENDENTE') {
      setConfirmacaoPagamento({
        open: true,
        conta: conta
      });
    } else {
      // Se estiver marcando como pendente, não precisa de confirmação
      await atualizarStatusConta(conta.id, 'PENDENTE');
      loadContas();
    }
  };

  const handleConfirmarPagamento = async () => {
    const conta = confirmacaoPagamento.conta;
    try {
      if (conta.tipo === 'MENSAL' && conta.quantidade_meses > 1) {
        // Criar registros para cada mês
        const dataBase = new Date(conta.data_vencimento);
        const promessas = [];

        // Criar todas as parcelas
        for (let i = 0; i < conta.quantidade_meses; i++) {
          const novaData = addMonths(dataBase, i);
          const novaConta = {
            descricao: `${conta.descricao} (${i + 1}/${conta.quantidade_meses})`,
            valor: Number(conta.valor), // Garantir que o valor seja número
            tipo: 'SIMPLES', // Cada parcela é tratada como conta simples
            data_vencimento: format(novaData, 'yyyy-MM-dd'),
            status: 'PENDENTE'
          };
          promessas.push(cadastrarConta(novaConta));
        }

        // Aguardar todas as parcelas serem criadas
        await Promise.all(promessas);
        
        // Excluir a conta original mensal apenas se todas as parcelas foram criadas
        await excluirConta(conta.id);
      } else {
        // Para contas simples, apenas atualizar o status
        await atualizarStatusConta(conta.id, 'PAGO');
      }
      
      await loadContas(); // Recarregar a lista de contas
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
    } finally {
      setConfirmacaoPagamento({ open: false, conta: null });
    }
  };

  const getStatusChip = (params) => {
    const config = {
      PENDENTE: { color: 'warning', icon: <PendingIcon />, label: 'Pendente' },
      PAGO: { color: 'success', icon: <CheckCircleIcon />, label: 'Pago' }
    };

    const statusConfig = config[params.value] || config.PENDENTE;

    return (
      <Chip
        icon={statusConfig.icon}
        label={statusConfig.label}
        color={statusConfig.color}
        size="small"
        onClick={() => handleToggleStatus(params.row)}
        sx={{ cursor: 'pointer' }}
      />
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'descricao', headerName: 'Descrição', width: 200 },
    { field: 'valor', headerName: 'Valor', width: 130, valueFormatter: (params) => 
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(params.value)
    },
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    { field: 'data_vencimento', headerName: 'Vencimento', width: 130, valueFormatter: (params) =>
      new Date(params.value).toLocaleDateString('pt-BR')
    },
    { field: 'quantidade_meses', headerName: 'Meses', width: 100 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => getStatusChip(params)
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar">
            <IconButton onClick={() => handleEdit(params.row)} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton onClick={() => handleDelete(params.row.id)} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    }
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Gestão Financeira</Typography>
        <Button variant="contained" color="primary" onClick={() => {
          setContaParaEditar(null);
          setFormData({
            descricao: '',
            valor: '',
            tipo: 'SIMPLES',
            data_vencimento: null,
            quantidade_meses: ''
          });
          setOpenDialog(true);
        }}>
          Nova Conta
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{contaParaEditar ? 'Editar Conta' : 'Cadastrar Nova Conta'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Valor"
              name="valor"
              type="number"
              value={formData.valor}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <MenuItem value="SIMPLES">Simples</MenuItem>
                <MenuItem value="MENSAL">Mensal</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data de Vencimento"
                value={formData.data_vencimento}
                onChange={(newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    data_vencimento: newValue
                  }));
                }}
                sx={{ width: '100%', mb: 2 }}
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true
                  }
                }}
              />
            </LocalizationProvider>

            {formData.tipo === 'MENSAL' && (
              <TextField
                fullWidth
                label="Quantidade de Meses"
                name="quantidade_meses"
                type="number"
                value={formData.quantidade_meses}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false);
            setContaParaEditar(null);
          }}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {contaParaEditar ? 'Salvar' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={contas}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          loading={loading}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Diálogo de confirmação de pagamento */}
      <Dialog
        open={confirmacaoPagamento.open}
        onClose={() => setConfirmacaoPagamento({ open: false, conta: null })}
      >
        <DialogTitle>Confirmar Pagamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmacaoPagamento.conta?.tipo === 'MENSAL' && confirmacaoPagamento.conta?.quantidade_meses > 1 ? (
              <>
                <Typography variant="body1" gutterBottom>
                  Esta é uma conta mensal com {confirmacaoPagamento.conta.quantidade_meses} parcelas.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Valor de cada parcela: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(confirmacaoPagamento.conta.valor)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Serão criados {confirmacaoPagamento.conta.quantidade_meses} registros com os seguintes vencimentos:
                </Typography>
                <Box sx={{ ml: 2 }}>
                  {Array.from({ length: confirmacaoPagamento.conta.quantidade_meses }).map((_, index) => {
                    const data = addMonths(new Date(confirmacaoPagamento.conta.data_vencimento), index);
                    return (
                      <Typography key={index} variant="body2" color="text.secondary">
                        Parcela {index + 1}: {format(data, 'dd/MM/yyyy')}
                      </Typography>
                    );
                  })}
                </Box>
              </>
            ) : (
              'Tem certeza que deseja marcar esta conta como paga?'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmacaoPagamento({ open: false, conta: null })}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmarPagamento} 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CadastroFinanceiro;
