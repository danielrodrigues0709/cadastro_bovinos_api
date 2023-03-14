const express = require('express');
const auth = require('../../auth');
const inseminacoesRouter = express.Router();

const { listInseminacoes, insertInseminacao, deleteInseminacao, updateInseminacao, selectInseminacaoById } = require('../controllers/inseminacoesController');

inseminacoesRouter.get('/', auth, listInseminacoes);
inseminacoesRouter.get('/:id', auth, selectInseminacaoById);
inseminacoesRouter.post('/', auth, insertInseminacao);
inseminacoesRouter.delete('/:id', auth, deleteInseminacao);
inseminacoesRouter.patch('/:id', auth, updateInseminacao);

module.exports = inseminacoesRouter;