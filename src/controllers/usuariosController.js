const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { listUsuarios, insertUsuario, deleteUsuario, updateUsuario, selectUsuarioById, selectUsuarioByUsername, selectUsuarioByEmail, logIn } = require("../models/usuariosModel");
const { MSGS } = require("../../msgs");
const { createSchemaSql } = require("../schemas");
const { createMedicamentosTable, createVacinasTable, createAnimaisTable, createInseminacoesTable, createVacinacoesTable, createPartosTable, createOcorrenciasTable } = require("../tables");
const { CONSTANTS } = require("../../utils");

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
    selectUsuarioByUsername(body.username).then(response => {
        if(response.rowCount > 0) {
            return res.status(422).json({
                message: MSGS.usuarioJaExistente
            });
        }
        else {
            selectUsuarioByEmail(body.email).then(response => {
                if(response.rowCount > 0) {
                    return res.status(422).json({
                        message: MSGS.emailJaExistente
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
                            insertUsuario(body.nome_usuario, body.username, body.telefone, body.email, hash)
                                .then(async response => {
                                    res.status(201).json({
                                        message: response.message,
                                        data: response.data,
                                    });
                                    await next();
                                })
                                .then(async () => {
                                    await createSchemaSql(body.username)
                                        .then(async response => {
                                            console.log(response);
                                            res.status(200);
                                            await next();
                                        })
                                        .then(async () => {
                                            await createMedicamentosTable(body.username)
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
                                            await createVacinasTable(body.username)
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
                                            await createAnimaisTable(body.username)
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
                                            await createInseminacoesTable(body.username)
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
                                            await createVacinacoesTable(body.username)
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
                                            await createPartosTable(body.username)
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
                                            await createOcorrenciasTable(body.username)
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

module.exports.logIn = (req, res, next) => {
    const username = req.body.username;
    const senha = req.body.senha;
    logIn(username)
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
                    let token = jwt.sign({
                        usuario: usuario.rows[0]
                    },
                    CONSTANTS.JWT_KEY,
                    {
                        expiresIn: '12h'
                    });
                    res.status(200).json(token);
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
    bcrypt.hash(body.senha, 10, (err, hash) => {
        if(err) {
            console.log(err);
            return res.status(422).json({
                message: MSGS.erroHash
            });
        }
        else {
            updateUsuario(body.nome_usuario, body.username, body.telefone, body.email, hash, id)
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