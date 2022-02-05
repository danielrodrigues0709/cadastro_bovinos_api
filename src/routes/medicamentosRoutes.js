const express = require('express');
const medicamentosRouter = express.Router();

const { listMedicamentos, insertMedicamento, deleteMedicamento, updateMedicamento, selectMedicamentoById, selectMedicamentoByDesc } = require('../controllers/medicamentosController');

medicamentosRouter.get('/', listMedicamentos);
medicamentosRouter.get('/:id', selectMedicamentoById);
medicamentosRouter.get('/searcByDesc/:medicamento', selectMedicamentoByDesc);
medicamentosRouter.post('/', insertMedicamento);
medicamentosRouter.delete('/:id', deleteMedicamento);
medicamentosRouter.patch('/:id', updateMedicamento);

module.exports = medicamentosRouter;