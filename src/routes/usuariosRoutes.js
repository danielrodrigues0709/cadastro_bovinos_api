const express = require('express');
const usuariosRouter = express.Router();

const { listUsuarios, insertUsuario, selectUsuarioById, deleteUsuario, updateUsuario, selectUsuarioByUsername } = require('../controllers/usuariosController');

usuariosRouter.get('/', listUsuarios);
usuariosRouter.get('/:id', selectUsuarioById);
usuariosRouter.get('/searchByUsername/:usuario', selectUsuarioByUsername);
usuariosRouter.post('/', insertUsuario);
usuariosRouter.delete('/:id', deleteUsuario);
usuariosRouter.patch('/:id', updateUsuario);

module.exports = usuariosRouter;