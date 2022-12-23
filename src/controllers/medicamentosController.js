const { listMedicamentos, selectMedicamentoById, selectMedicamentoByDesc, insertMedicamento, deleteMedicamento, updateMedicamento } = require("../models/medicamentosModel");
const { MSGS } = require("../../msgs");

module.exports.listMedicamentos = (req, res, next) => {
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    listMedicamentos(schema)
        .then(medicamentos => {
            res.status(200).json(medicamentos);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertMedicamento = (req, res, next) => {
    const body = req.body;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    insertMedicamento(body.medicamento, body.principio_ativo, schema)
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

module.exports.selectMedicamentoById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectMedicamentoById(id, schema)
        .then(medicamento => {
            res.status(200).json(medicamento);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.selectMedicamentoByDesc = (req, res, next) => {
    const medicamento = req.params.medicamento;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectMedicamentoByDesc(medicamento, schema)
        .then(medicamento => {
            res.status(200).json(medicamento);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err);
        });
}

module.exports.deleteMedicamento = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteMedicamento(id, schema)
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

module.exports.updateMedicamento = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateMedicamento(body.medicamento, body.principio_ativo, id, schema)
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