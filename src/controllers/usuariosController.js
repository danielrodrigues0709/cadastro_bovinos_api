const { listUsuarios, insertUsuario, deleteUsuario, updateUsuario, selectUsuarioById, selectUsuarioByUsername } = require("../models/usuariosModel");
const { MSGS } = require("../../msgs");
const bcrypt = require("bcrypt");

module.exports.listUsuarios = (req, res, next) => {
    listUsuarios()
        .then(usuarios => {
            res.status(200).json(usuarios);
            next();
        })
        .catch(err => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}

module.exports.insertUsuario = (req, res, next) => {
    const body = req.body;
    selectUsuarioByUsername(body.usuario).then(response => {
        if(response.rowCount > 0) {
            return res.status(500).json({
                message: MSGS.usuarioJaExistente
            });
        }
        else {
            bcrypt.hash(req.body.senha, 10, (err, hash) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        message: MSGS.erroHash
                    });
                }
                else {
                    insertUsuario(body.usuario, body.email, hash)
                        .then(response => {
                            res.status(201).json({
                                message: response
                            });
                            next();
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: MSGS.erroServidor
                            });
                            console.log(err);
                        });
                }
            });
        }
    });
}

module.exports.selectUsuarioById = (req, res, next) => {
    const id = Number(req.params.id);
    selectUsuarioById(id)
        .then(usuario => {
            res.status(200).json(usuario);
            next();
        })
        .catch(err => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err);
        });
}

module.exports.selectUsuarioByUsername = (req, res, next) => {
    const usuario = req.params.usuario;
    selectUsuarioByUsername(usuario)
        .then(usuario => {
            res.status(200).json(usuario);
            next();
        })
        .catch(err => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err);
        });
}

module.exports.deleteUsuario = (req, res, next) => {
    const id = Number(req.params.id);
    deleteUsuario(id)
        .then(response => {
            res.status(200).json({
                message: response
            });
            next();
        })
        .catch(err => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err);
        });
}

module.exports.updateUsuario = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    bcrypt.hash(req.body.senha, 10, (err, hash) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                message: MSGS.erroHash
            });
        }
        else {
            updateUsuario(body.usuario, body.email, hash, id)
                .then(usuario => {
                    res.json({usuario});
                    next();
                })
                .catch(err => {
                    res.status(500).json({
                        message: MSGS.erroServidor
                    });
                    console.log(err);
                });
        }
    });
}