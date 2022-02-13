const express = require('express');
const vacinasRouter = express.Router();

const { listVacinas, insertVacina, deleteVacina, updateVacina, selectVacinaById } = require('../controllers/vacinasController');

vacinasRouter.get('/', listVacinas);
vacinasRouter.get('/:id', selectVacinaById);
vacinasRouter.post('/', insertVacina);
vacinasRouter.delete('/:id', deleteVacina);
vacinasRouter.patch('/:id', updateVacina);

module.exports = vacinasRouter;