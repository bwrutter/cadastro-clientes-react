import express from 'express';
import {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  excluirCliente,
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/clientes', listarClientes);
router.get('/clientes/:id', buscarCliente);
router.post('/clientes', criarCliente);
router.put('/clientes/:id', atualizarCliente);
router.delete('/clientes/:id', excluirCliente);

export default router;
