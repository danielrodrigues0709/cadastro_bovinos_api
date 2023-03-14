const express = require('express');
const auth = require('../../auth');
const animaisRouter = express.Router();

const { listAnimais, insertAnimal, deleteAnimal, updateAnimal, selectAnimalById, selectFather, selectMother, selectAnimalByDesc } = require('../controllers/animaisController');

animaisRouter.get('/', auth, listAnimais);
animaisRouter.get('/:id', auth, selectAnimalById);
animaisRouter.get('/searchByDesc/:nome_animal', auth, selectAnimalByDesc);
animaisRouter.get('/father/:id', auth, selectFather);
animaisRouter.get('/mother/:id', auth, selectMother);
animaisRouter.post('/', auth, insertAnimal);
animaisRouter.delete('/:id', auth, deleteAnimal);
animaisRouter.patch('/:id', auth, updateAnimal);

module.exports = animaisRouter;