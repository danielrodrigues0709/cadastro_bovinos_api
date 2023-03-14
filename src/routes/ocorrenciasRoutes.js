const express = require('express');
const auth = require('../../auth');
const ocorrenciasRouter = express.Router();

const { listOcorrencias, insertOcorrencia, deleteOcorrencia, updateOcorrencia, selectOcorrenciaById } = require('../controllers/ocorrenciasController');

ocorrenciasRouter.get('/', auth, listOcorrencias);
ocorrenciasRouter.get('/:id', auth, selectOcorrenciaById);
ocorrenciasRouter.post('/', auth, insertOcorrencia);
ocorrenciasRouter.delete('/:id', auth, deleteOcorrencia);
ocorrenciasRouter.patch('/:id', auth, updateOcorrencia);

module.exports = ocorrenciasRouter;