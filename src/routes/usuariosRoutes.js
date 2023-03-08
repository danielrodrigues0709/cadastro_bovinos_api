const express = require('express');
const usuariosRouter = express.Router();

const { listUsuarios, insertUsuario, selectUsuarioById, deleteUsuario, updateUsuario, logIn } = require('../controllers/usuariosController');

usuariosRouter.get('/', listUsuarios);
usuariosRouter.get('/:id', selectUsuarioById);
usuariosRouter.get('/login/:username/:senha', logIn);
usuariosRouter.post('/', insertUsuario);
usuariosRouter.delete('/:id', deleteUsuario);
usuariosRouter.patch('/:id', updateUsuario);

module.exports = usuariosRouter;