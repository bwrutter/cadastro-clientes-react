import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/clientesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/api', clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});