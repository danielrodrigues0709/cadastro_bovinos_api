const express = require('express');
const partosRouter = express.Router();

const { listPartos, insertParto, deleteParto, updateParto, selectPartoById } = require('../controllers/partosController');

partosRouter.get('/', listPartos);
partosRouter.get('/:id', selectPartoById);
partosRouter.post('/', insertParto);
partosRouter.delete('/:id', deleteParto);
partosRouter.patch('/:id', updateParto);

module.exports = partosRouter;