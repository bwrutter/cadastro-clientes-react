import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

/* export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}); */

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

const criarBancoDeDados = async () => {
  const client = await pool.connect();
  try {
    await client.query('CREATE DATABASE clientes');
    console.log('Banco de dados "clientes" criado com sucesso');
  } catch (error) {
    if (error.code === '42P04') {
      console.log('O banco de dados "clientes" já existe');
    } else {
      console.error('Erro ao criar banco de dados:', error);
    }
  } finally {
    client.release();
  }
};

(async () => {
  await criarBancoDeDados();
})();