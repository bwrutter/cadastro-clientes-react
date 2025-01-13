import { pool } from '../config/database.js';

export const getAllClientes = async () => {
  const { rows } = await pool.query('SELECT * FROM clientes');
  return rows;
};

export const getClienteById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return rows[0];
};

export const createCliente = async (nome, email, telefone) => {
  const { rows } = await pool.query(
    'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, telefone]
  );
  return rows[0];
};

export const updateCliente = async (id, nome, email, telefone) => {
  const { rows } = await pool.query(
    'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
    [nome, email, telefone, id]
  );
  return rows[0];
};

export const deleteCliente = async (id) => {
  await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
};
