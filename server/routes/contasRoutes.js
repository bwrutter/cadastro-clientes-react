import express from 'express';
import {
  criarConta,
  listarContas,
  atualizarConta,
  atualizarStatusConta,
  excluirConta,
} from '../controllers/contasController.js';

const router = express.Router();

router.post('/contas', criarConta);
router.get('/contas', listarContas);
router.put('/contas/:id', atualizarConta);
router.patch('/contas/:id/status', atualizarStatusConta);
router.delete('/contas/:id', excluirConta);

export default router; 