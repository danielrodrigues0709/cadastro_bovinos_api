const { listVacinacoes, selectVacinacaoById, insertVacinacao, deleteVacinacao, updateVacinacao } = require("../models/vacinacoesModel");
const { MSGS } = require("../../msgs");

module.exports.listVacinacoes = (req, res, next) => {
    const id_animal = req.query.id_animal;
    const id_vacina = req.query.id_vacina;
    const tipo = req.query.tipo;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    listVacinacoes(id_animal ? id_animal : null, id_vacina ? id_vacina : null, tipo ? tipo : null, schema)
        .then(vacinacoes => {
            res.status(200).json(vacinacoes);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertVacinacao = (req, res, next) => {
    const body = req.body;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    insertVacinacao(body.data_vacinacao, body.id_animal, body.id_vacina, body.dose, body.tipo, schema)
        .then(response => {
            res.status(201).json({
                message: response.message,
                data: response.data,
            });
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.selectVacinacaoById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectVacinacaoById(id, schema)
        .then(vacinacao => {
            res.status(200).json(vacinacao);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.deleteVacinacao = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteVacinacao(id, schema)
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
            console.log(err)
        });
}

module.exports.updateVacinacao = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateVacinacao(body.data_vacinacao, body.id_animal, body.id_vacina, body.dose, body.tipo, id, schema)
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
            console.log(err)
        });
}