import { pool } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executarMigracao = async () => {
  try {
    // Lê o arquivo SQL
    const sqlPath = path.join(__dirname, '..', 'migrations', 'contas.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Executa a migração
    await pool.query(sql);
    console.log('Migração executada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar migração:', error);
  } finally {
    await pool.end();
  }
};

executarMigracao(); 