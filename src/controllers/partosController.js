const { listPartos, selectPartoById, insertParto, deleteParto, updateParto } = require("../models/partosModel");
const { MSGS } = require("../../msgs");

module.exports.listPartos = (req, res, next) => {
    const nro_controle_cria = req.query.nro_controle_cria;
    const nome_cria = req.query.nome_cria;
    const id_cria = req.query.id_cria;
    const id_reprodutor = req.query.id_reprodutor;
    const id_mae = req.query.id_mae;
    const sexo = req.query.sexo;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    listPartos(
        nro_controle_cria ? nro_controle_cria : null,
        nome_cria,
        id_cria ? id_cria : null,
        id_reprodutor ? id_reprodutor : null,
        id_mae ? id_mae : null,
        sexo ? sexo : null,
        schema
        )
        .then(partos => {
            res.status(200).json(partos);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertParto = (req, res, next) => {
    const body = req.body;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    insertParto(body.data_parto, body.nro_controle_cria, body.nome_cria, body.id_cria, body.id_reprodutor, body.id_mae, body.sexo, schema)
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

module.exports.selectPartoById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectPartoById(id, schema)
        .then(parto => {
            res.status(200).json(parto);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.deleteParto = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteParto(id, schema)
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

module.exports.updateParto = (req, res, next) => {
    const body = req.body;
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateParto(body.data_parto, body.nro_controle_cria, body.nome_cria, body.id_cria, body.id_reprodutor, body.id_mae, body.sexo, id, schema)
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