const { listMedicamentos, selectMedicamento, insertMedicamento, deleteMedicamento, updateMedicamento } = require("../models/medicamentosModel");
const { MSGS } = require("../../msgs");

module.exports.listMedicamentos = (req, res, next) => {
    listMedicamentos()
        .then(medicamentos => {
            res.status(200).json(medicamentos);
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}

module.exports.insertMedicamento = (req, res, next) => {
    const body = req.body;
    insertMedicamento(body.medicamento)
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

module.exports.selectMedicamento = (req, res, next) => {
    const id = Number(req.params.id);
    selectMedicamento(id)
        .then(medicamento => {
            res.status(200).json(medicamento);
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}

module.exports.deleteMedicamento = (req, res, next) => {
    const id = Number(req.params.id);
    deleteMedicamento(id)
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

module.exports.updateMedicamento = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    updateMedicamento(body.medicamento, id)
        .then(medicamento => {
            res.json({medicamento});
            next();
        })
        .catch(() => {
            res.status(500).json({
                message: MSGS.erroServidor
            });
            console.log(err)
        });
}