const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const usuariosRoutes = require('./src/routes/usuariosRoutes');
const medicamentosRoutes = require('./src/routes/medicamentosRoutes');
const vacinasRoutes = require('./src/routes/vacinasRoutes');
const { createUsuariosTable } = require('./src/tables');
const animaisRouter = require('./src/routes/animaisRoutes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//Cria tabelas
createUsuariosTable();

app.use(cors());

app.use('/usuarios', usuariosRoutes);
app.use('/medicamentos', medicamentosRoutes);
app.use('/vacinas', vacinasRoutes);
app.use('/animais', animaisRouter);

module.exports = app;