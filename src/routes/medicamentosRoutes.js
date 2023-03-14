const express = require('express');
const auth = require('../../auth');
const medicamentosRouter = express.Router();

const { listMedicamentos, insertMedicamento, deleteMedicamento, updateMedicamento, selectMedicamentoById, selectMedicamentoByDesc } = require('../controllers/medicamentosController');

medicamentosRouter.get('/', auth, listMedicamentos);
medicamentosRouter.get('/:id', auth, selectMedicamentoById);
medicamentosRouter.get('/searchByDesc/:medicamento', auth, selectMedicamentoByDesc);
medicamentosRouter.post('/', auth, insertMedicamento);
medicamentosRouter.delete('/:id', auth, deleteMedicamento);
medicamentosRouter.patch('/:id', auth, updateMedicamento);

module.exports = medicamentosRouter;