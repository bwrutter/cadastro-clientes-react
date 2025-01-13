const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientesRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', clientesRoutes);

module.exports = app;
