const { listVacinas, selectVacinaById, insertVacina, deleteVacina, updateVacina, selectVacinaByDesc } = require("../models/vacinasModel");
const { MSGS } = require("../../msgs");

module.exports.listVacinas = (req, res, next) => {
    const vacina_vermifugo = req.query.vacina_vermifugo;
    const tipo = req.query.tipo;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    listVacinas(vacina_vermifugo, tipo ? tipo : null, schema)
        .then(vacinas => {
            res.status(200).json(vacinas);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertVacina = (req, res, next) => {
    const body = req.body;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    insertVacina(body.vacina_vermifugo, body.doses, body.tipo, schema)
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

module.exports.selectVacinaById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectVacinaById(id, schema)
        .then(vacina => {
            res.status(200).json(vacina);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.selectVacinaByDesc = (req, res, next) => {
    const vacina_vermifugo = req.params.vacina_vermifugo;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectVacinaByDesc(vacina_vermifugo, schema)
        .then(vacina => {
            res.status(200).json(vacina);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err);
        });
}

module.exports.deleteVacina = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteVacina(id, schema)
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

module.exports.updateVacina = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateVacina(body.vacina_vermifugo, body.doses, body.tipo, id, schema)
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