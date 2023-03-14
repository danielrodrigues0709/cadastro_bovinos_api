const express = require('express');
const auth = require('../../auth');
const usuariosRouter = express.Router();

const { listUsuarios, insertUsuario, selectUsuarioById, deleteUsuario, updateUsuario, logIn } = require('../controllers/usuariosController');

usuariosRouter.get('/', listUsuarios);
usuariosRouter.get('/:id', selectUsuarioById);
usuariosRouter.post('/login/', logIn);
usuariosRouter.post('/', insertUsuario);
usuariosRouter.delete('/:id', auth, deleteUsuario);
usuariosRouter.patch('/:id', auth, updateUsuario);

module.exports = usuariosRouter;