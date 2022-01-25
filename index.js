const express = require('express');

const { MSGS } = require('./msgs');
const medicamentosRouter = require('./src/routes/medicamentosRoutes');
const { Tabelas } = require('./src/tables');

const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Rota de teste
app.get('/', (req, res) => {
    res.send(`${MSGS.servidor} ${PORT}`);
})

// Para uso de rotas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cria tabelas
Tabelas.createMedicamentosTable();
// Tabelas.deleteMedicamentosTable();

// Rotas
app.use('/medicamentos', medicamentosRouter);