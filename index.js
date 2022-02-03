const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const medicamentosRoutes = require('./src/routes/medicamentosRoutes');
const { createMedicamentosTable } = require('./src/tables');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//Cria tabelas
createMedicamentosTable();

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

app.use('/medicamentos', medicamentosRoutes);

module.exports = app;