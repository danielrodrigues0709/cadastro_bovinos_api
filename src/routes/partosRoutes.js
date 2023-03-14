const express = require('express');
const auth = require('../../auth');
const partosRouter = express.Router();

const { listPartos, insertParto, deleteParto, updateParto, selectPartoById } = require('../controllers/partosController');

partosRouter.get('/', auth, listPartos);
partosRouter.get('/:id', auth, selectPartoById);
partosRouter.post('/', auth, insertParto);
partosRouter.delete('/:id', auth, deleteParto);
partosRouter.patch('/:id', auth, updateParto);

module.exports = partosRouter;