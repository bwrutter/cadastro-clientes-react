import * as contaModel from '../models/contaModel.js';

export const criarConta = async (req, res) => {
  try {
    const { descricao, valor, tipo, data_vencimento, quantidade_meses } = req.body;
    const conta = await contaModel.createConta(descricao, valor, tipo, data_vencimento, quantidade_meses);
    return res.status(201).json(conta);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar conta', error: error.message });
  }
};

export const atualizarConta = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, valor, tipo, data_vencimento, quantidade_meses } = req.body;
    const conta = await contaModel.updateConta(id, descricao, valor, tipo, data_vencimento, quantidade_meses);
    
    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    return res.json(conta);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar conta', error: error.message });
  }
};

export const listarContas = async (req, res) => {
  try {
    const contas = await contaModel.getAllContas();
    return res.json(contas);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar contas', error: error.message });
  }
};

export const atualizarStatusConta = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const conta = await contaModel.updateContaStatus(id, status);
    
    if (!conta) {
      return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    return res.json(conta);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar status da conta', error: error.message });
  }
};

export const excluirConta = async (req, res) => {
  try {
    const { id } = req.params;
    await contaModel.deleteConta(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao excluir conta', error: error.message });
  }
}; 