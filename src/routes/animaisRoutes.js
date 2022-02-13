const express = require('express');
const animaisRouter = express.Router();

const { listAnimais, insertAnimal, deleteAnimal, updateAnimal, selectAnimalById } = require('../controllers/animaisController');

animaisRouter.get('/', listAnimais);
animaisRouter.get('/:id', selectAnimalById);
animaisRouter.post('/', insertAnimal);
animaisRouter.delete('/:id', deleteAnimal);
animaisRouter.patch('/:id', updateAnimal);

module.exports = animaisRouter;