const bcrypt = require("bcrypt");

const { listUsuarios, insertUsuario, deleteUsuario, updateUsuario, selectUsuarioById, selectUsuarioByUsername } = require("../models/usuariosModel");
const { MSGS } = require("../../msgs");
const { createSchemaSql } = require("../schemas");
const { snakeCase } = require("../../utils");
const { createMedicamentosTable, createVacinasTable, createAnimaisTable, createInseminacoesTable, createVacinacoesTable, createPartosTable, createOcorrenciasTable } = require("../tables");

module.exports.listUsuarios = (req, res, next) => {
    listUsuarios()
        .then(usuarios => {
            res.status(200).json(usuarios);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertUsuario = (req, res, next) => {
    const body = req.body;
    selectUsuarioByUsername(body.usuario).then(response => {
        if(response.rowCount > 0) {
            return res.status(422).json({
                message: MSGS.usuarioJaExistente
            });
        }
        else {
            bcrypt.hash(req.body.senha, 10, (err, hash) => {
                if(err) {
                    console.log(err);
                    return res.status(422).json({
                        message: MSGS.erroHash
                    });
                }
                else {
                    insertUsuario(body.usuario, body.email, hash)
                        .then(async response => {
                            res.status(201).json({
                                message: response.message,
                                data: response.data,
                            });
                            await next();
                        })
                        .then(async () => {
                            await createSchemaSql(snakeCase(body.usuario))
                                .then(async response => {
                                    console.log(response);
                                    res.status(200);
                                    await next();
                                })
                                .then(async () => {
                                    await createMedicamentosTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                    await createVacinasTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                    await createAnimaisTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                    await createInseminacoesTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                    await createVacinacoesTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                    await createPartosTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                    await createOcorrenciasTable(snakeCase(body.usuario))
                                        .then(response => {
                                            console.log(response);
                                            res.status(200);
                                            next();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.status(422).json({
                                                message: MSGS.erroTabela
                                            });
                                        });
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(422).json({
                                        message: MSGS.erroSchema
                                    });
                                });
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(422).json({
                                message: MSGS.erroTabela
                            });
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
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err);
        });
}

module.exports.selectUsuarioByUsername = (req, res, next) => {
    const usuario = req.params.usuario;
    const senha = req.params.senha;
    selectUsuarioByUsername(usuario)
        .then(usuario => {
            if(usuario.rows.length == 0) {
                res.status(401).json({
                    message: MSGS.loginInvalido
                });
            }
            else {
                let match = bcrypt.compareSync(senha, usuario.rows[0].senha);
                if(!match) {
                    res.status(401).json({
                        message: MSGS.loginInvalido
                    });
                    next();
                }
                else if(match) {
                    res.status(200).json(usuario);
                    next();
                }
            };
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
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
            res.status(422).json({
                message: MSGS.erroRequisicao
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
            return res.status(422).json({
                message: MSGS.erroHash
            });
        }
        else {
            updateUsuario(body.usuario, body.email, hash, id)
                .then(response => {
                    res.status(200).json({
                        message: response.message,
                        data: response.data,
                    });
                    next();
                })
                .catch(err => {
                    res.status(422).json({
                        message: MSGS.erroRequisicao
                    });
                    console.log(err);
                });
        }
    });
}