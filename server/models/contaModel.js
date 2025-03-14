import { pool } from '../config/database.js';

export const createConta = async (descricao, valor, tipo, data_vencimento, quantidade_meses = null) => {
  const { rows } = await pool.query(
    'INSERT INTO contas (descricao, valor, tipo, data_vencimento, quantidade_meses) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [descricao, valor, tipo, data_vencimento, quantidade_meses]
  );
  return rows[0];
};

export const getAllContas = async () => {
  const { rows } = await pool.query('SELECT * FROM contas ORDER BY data_vencimento');
  return rows;
};

export const updateConta = async (id, descricao, valor, tipo, data_vencimento, quantidade_meses = null) => {
  const { rows } = await pool.query(
    'UPDATE contas SET descricao = $1, valor = $2, tipo = $3, data_vencimento = $4, quantidade_meses = $5 WHERE id = $6 RETURNING *',
    [descricao, valor, tipo, data_vencimento, quantidade_meses, id]
  );
  return rows[0];
};

export const updateContaStatus = async (id, status) => {
  const { rows } = await pool.query(
    'UPDATE contas SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return rows[0];
};

export const deleteConta = async (id) => {
  await pool.query('DELETE FROM contas WHERE id = $1', [id]);
}; 