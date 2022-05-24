const express = require('express');
const vacinacoesRouter = express.Router();

const { listVacinacoes, insertVacinacao, deleteVacinacao, updateVacinacao, selectVacinacaoById } = require('../controllers/vacinacoesController');

vacinacoesRouter.get('/', listVacinacoes);
vacinacoesRouter.get('/:id', selectVacinacaoById);
vacinacoesRouter.post('/', insertVacinacao);
vacinacoesRouter.delete('/:id', deleteVacinacao);
vacinacoesRouter.patch('/:id', updateVacinacao);

module.exports = vacinacoesRouter;