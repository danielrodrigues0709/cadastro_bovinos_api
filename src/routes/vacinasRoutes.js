const express = require('express');
const vacinasRouter = express.Router();

const { listVacinas, insertVacina, deleteVacina, updateVacina, selectVacinaById, selectVacinaByDesc } = require('../controllers/vacinasController');

vacinasRouter.get('/', listVacinas);
vacinasRouter.get('/:id', selectVacinaById);
vacinasRouter.get('/searchByDesc/:vacina_vermifugo', selectVacinaByDesc);
vacinasRouter.post('/', insertVacina);
vacinasRouter.delete('/:id', deleteVacina);
vacinasRouter.patch('/:id', updateVacina);

module.exports = vacinasRouter;