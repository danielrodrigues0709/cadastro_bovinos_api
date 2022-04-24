const express = require('express');
const animaisRouter = express.Router();

const { listAnimais, insertAnimal, deleteAnimal, updateAnimal, selectAnimalById, selectFather, selectMother } = require('../controllers/animaisController');

animaisRouter.get('/', listAnimais);
animaisRouter.get('/:id', selectAnimalById);
animaisRouter.get('/father/:id', selectFather);
animaisRouter.get('/mother/:id', selectMother);
animaisRouter.post('/', insertAnimal);
animaisRouter.delete('/:id', deleteAnimal);
animaisRouter.patch('/:id', updateAnimal);

module.exports = animaisRouter;