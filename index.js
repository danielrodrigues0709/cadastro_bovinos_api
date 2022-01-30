const express = require('express');

const { MSGS } = require('./msgs');
const medicamentosRouter = require('./src/routes/medicamentosRoutes');
const { createMedicamentosTable, deleteMedicamentosTable } = require('./src/tables');

const app = express();
const PORT = process.env.PORT;

// Rota de teste
app.get('/', (req, res) => {
    res.send(`${MSGS.servidor} ${PORT}`);
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

//Cria tabelas
createMedicamentosTable();
// deleteMedicamentosTable();

// Rotas
app.use('/medicamentos', medicamentosRouter);