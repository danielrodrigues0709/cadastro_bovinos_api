const express = require('express');
const usuariosRouter = express.Router();

const { listUsuarios, insertUsuario, selectUsuario, deleteUsuario, updateUsuario } = require('../controllers/usuariosController');

usuariosRouter.get('/', listUsuarios);
usuariosRouter.get('/:id', selectUsuario);
usuariosRouter.post('/', insertUsuario);
usuariosRouter.delete('/:id', deleteUsuario);
usuariosRouter.patch('/:id', updateUsuario);

module.exports = usuariosRouter;