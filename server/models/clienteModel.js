import { pool } from '../config/database.js';

export const getAllClientes = async () => {
  const { rows } = await pool.query('SELECT * FROM clientes');
  return rows;
};

export const getClienteById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return rows[0];
};

export const createCliente = async (nome, email, telefone, tipo_documento, documento) => {
  const { rows } = await pool.query(
    'INSERT INTO clientes (nome, email, telefone, tipo_documento, documento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, email, telefone, tipo_documento, documento]
  );
  return rows[0];
};

export const updateCliente = async (id, nome, email, telefone, tipo_documento, documento) => {
  const { rows } = await pool.query(
    'UPDATE clientes SET nome = $1, email = $2, telefone = $3, tipo_documento = $4, documento = $5 WHERE id = $6 RETURNING *',
    [nome, email, telefone, tipo_documento, documento, id]
  );
  return rows[0];
};

export const deleteCliente = async (id) => {
  await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
};
