const { listOcorrencias, selectOcorrenciaById, insertOcorrencia, deleteOcorrencia, updateOcorrencia } = require("../models/ocorrenciasModel");
const { MSGS } = require("../../msgs");

module.exports.listOcorrencias = (req, res, next) => {
    const id_animal = req.query.id_animal;
    const id_medicamento = req.query.id_medicamento;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    listOcorrencias(id_animal ? id_animal : null, id_medicamento ? id_medicamento : null, schema)
        .then(ocorrencias => {
            res.status(200).json(ocorrencias);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertOcorrencia = (req, res, next) => {
    const body = req.body;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    insertOcorrencia(body.data_ocorrencia, body.descricao, body.id_animal, body.id_medicamento, schema)
        .then(response => {
            res.status(201).json({
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

module.exports.selectOcorrenciaById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectOcorrenciaById(id, schema)
        .then(ocorrencia => {
            res.status(200).json(ocorrencia);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.deleteOcorrencia = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteOcorrencia(id, schema)
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

module.exports.updateOcorrencia = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateOcorrencia(body.data_ocorrencia, body.descricao, body.id_animal, body.id_medicamento, id, schema)
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