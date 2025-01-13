import * as clienteModel from '../models/clienteModel.js';

export const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteModel.getClienteById(id);

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const criarCliente = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const cliente = await clienteModel.createCliente(nome, email, telefone);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const cliente = await clienteModel.updateCliente(id, nome, email, telefone);

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const excluirCliente = async (req, res) => {
  try {
    const { id, nome } = req.params;
    await clienteModel.deleteCliente(id);
    res.status(204).send(`Cliente ${nome} excluído com sucesso`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};