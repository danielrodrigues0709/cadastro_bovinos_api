const express = require('express');
const auth = require('../../auth');
const vacinasRouter = express.Router();

const { listVacinas, insertVacina, deleteVacina, updateVacina, selectVacinaById, selectVacinaByDesc } = require('../controllers/vacinasController');

vacinasRouter.get('/', auth, listVacinas);
vacinasRouter.get('/:id', auth, selectVacinaById);
vacinasRouter.get('/searchByDesc/:vacina_vermifugo', auth, selectVacinaByDesc);
vacinasRouter.post('/', auth, insertVacina);
vacinasRouter.delete('/:id', auth, deleteVacina);
vacinasRouter.patch('/:id', auth, updateVacina);

module.exports = vacinasRouter;