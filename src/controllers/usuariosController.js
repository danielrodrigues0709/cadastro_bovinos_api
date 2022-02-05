const { listUsuarios, selectUsuario, insertUsuario, deleteUsuario, updateUsuario } = require("../models/usuariosModel");
const { MSGS } = require("../../msgs");

module.exports.listUsuarios = (req, res, next) => {
    listUsuarios()
        .then(usuarios => {
            res.status(200).json(usuarios);
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}

module.exports.insertUsuario = (req, res, next) => {
    const body = req.body;
    insertUsuario(body.usuario, body.email, body.senha)
        .then(response => {
            res.status(201).json({
                message: response
            });
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}

module.exports.selectUsuario = (req, res, next) => {
    const id = Number(req.params.id);
    selectUsuario(id)
        .then(usuario => {
            res.status(200).json(usuario);
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
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
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}

module.exports.updateUsuario = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    updateUsuario(body.usuario, body.email, body.senha, id)
        .then(usuario => {
            res.json({usuario});
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}