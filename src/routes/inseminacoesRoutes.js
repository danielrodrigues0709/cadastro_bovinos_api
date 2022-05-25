const express = require('express');
const inseminacoesRouter = express.Router();

const { listInseminacoes, insertInseminacao, deleteInseminacao, updateInseminacao, selectInseminacaoById } = require('../controllers/inseminacoesController');

inseminacoesRouter.get('/', listInseminacoes);
inseminacoesRouter.get('/:id', selectInseminacaoById);
inseminacoesRouter.post('/', insertInseminacao);
inseminacoesRouter.delete('/:id', deleteInseminacao);
inseminacoesRouter.patch('/:id', updateInseminacao);

module.exports = inseminacoesRouter;