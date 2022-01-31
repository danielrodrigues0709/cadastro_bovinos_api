const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const medicamentosRoutes = require('./src/routes/medicamentosRoutes');
const { createMedicamentosTable, deleteMedicamentosTable } = require('./src/tables');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));  // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//Cria tabelas
createMedicamentosTable();
// deleteMedicamentosTable();

app.use('/medicamentos', medicamentosRoutes);

module.exports = app;