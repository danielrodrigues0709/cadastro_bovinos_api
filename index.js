const express = require('express');

const { openConnection } = require('./db');
const { MSGS } = require('./msgs');
const medicamentosRouter = require('./src/routes/medicamentosRoutes');
const { createMedicamentosTable, deleteMedicamentosTable } = require('./src/tables');

const router = express.Router();
const app = openConnection();

// Rota de teste
router.get('/', (req, res) => {
    res.send(`${MSGS.servidor} ${PORT}`);
})

//Cria tabelas
createMedicamentosTable();
// deleteMedicamentosTable();

// Rotas
router.use('/medicamentos', medicamentosRouter);


module.exports.dbQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        app.query(query, params, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
    .finally(() => {
        app.end();
        console.log(MSGS.fechaConexao);
    })
}