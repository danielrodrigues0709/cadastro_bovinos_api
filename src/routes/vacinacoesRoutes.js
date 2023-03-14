const express = require('express');
const auth = require('../../auth');
const vacinacoesRouter = express.Router();

const { listVacinacoes, insertVacinacao, deleteVacinacao, updateVacinacao, selectVacinacaoById } = require('../controllers/vacinacoesController');

vacinacoesRouter.get('/', auth, listVacinacoes);
vacinacoesRouter.get('/:id', auth, selectVacinacaoById);
vacinacoesRouter.post('/', auth, insertVacinacao);
vacinacoesRouter.delete('/:id', auth, deleteVacinacao);
vacinacoesRouter.patch('/:id', auth, updateVacinacao);

module.exports = vacinacoesRouter;