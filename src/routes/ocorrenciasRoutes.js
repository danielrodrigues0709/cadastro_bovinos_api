const express = require('express');
const ocorrenciasRouter = express.Router();

const { listOcorrencias, insertOcorrencia, deleteOcorrencia, updateOcorrencia, selectOcorrenciaById } = require('../controllers/ocorrenciasController');

ocorrenciasRouter.get('/', listOcorrencias);
ocorrenciasRouter.get('/:id', selectOcorrenciaById);
ocorrenciasRouter.post('/', insertOcorrencia);
ocorrenciasRouter.delete('/:id', deleteOcorrencia);
ocorrenciasRouter.patch('/:id', updateOcorrencia);

module.exports = ocorrenciasRouter;