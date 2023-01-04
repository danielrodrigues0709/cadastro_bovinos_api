const { listInseminacoes, selectInseminacaoById, insertInseminacao, deleteInseminacao, updateInseminacao } = require("../models/inseminacoesModel");
const { MSGS } = require("../../msgs");

module.exports.listInseminacoes = (req, res, next) => {
    const id_animal = req.query.id_animal;
    const id_reprodutor = req.query.id_reprodutor;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    listInseminacoes(id_animal ? id_animal : null, id_reprodutor ? id_reprodutor : null, schema)
        .then(inseminacoes => {
            res.status(200).json(inseminacoes);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertInseminacao = (req, res, next) => {
    const body = req.body;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    insertInseminacao(body.data_inseminacao, body.data_previsao_parto, body.id_animal, body.id_reprodutor, schema)
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

module.exports.selectInseminacaoById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectInseminacaoById(id, schema)
        .then(inseminacao => {
            res.status(200).json(inseminacao);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.deleteInseminacao = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteInseminacao(id, schema)
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

module.exports.updateInseminacao = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateInseminacao(body.data_inseminacao, body.data_previsao_parto, body.id_animal, body.id_reprodutor, id, schema)
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