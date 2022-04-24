const { listAnimais, selectAnimalById, insertAnimal, deleteAnimal, updateAnimal, selectFather, selectMother, selectAnimalNumControle } = require("../models/animaisModel");
const { MSGS } = require("../../msgs");

module.exports.listAnimais = (req, res, next) => {
    const nome_animal = req.query.nome_animal;
    const nro_controle = req.query.nro_controle;
    const sexo = req.query.sexo;
    const matriz = req.query.matriz;
    const rebanho = req.query.rebanho;
    const registrado = req.query.registrado;
    const id_pai = req.query.id_pai;
    const id_mae = req.query.id_mae;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    
    listAnimais(
        nome_animal,
        nro_controle ? nro_controle : null,
        sexo,
        matriz ? matriz : null,
        rebanho ? rebanho : null,
        registrado ? registrado : null,
        id_pai ? id_pai : null,
        id_mae ? id_mae : null,
        schema)
        .then(animais => {
            res.status(200).json(animais);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.insertAnimal = (req, res, next) => {
    const nome_animal = req.body.nome_animal;
    const nro_controle = req.body.nro_controle;
    const data_nascimento = req.body.data_nascimento;
    const sexo = req.body.sexo;
    const matriz = req.body.matriz;
    const rebanho = req.body.rebanho;
    const registrado = req.body.registrado;
    const id_pai = req.body.id_pai;
    const id_mae = req.body.id_mae;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectAnimalNumControle(nro_controle, schema).then(response => {
        if(response.rowCount > 0) {
            return res.status(422).json({
                message: MSGS.registroExistente
            });
        }
        else {
            insertAnimal(nome_animal, nro_controle, data_nascimento, sexo, matriz, rebanho, registrado, id_pai, id_mae, schema)
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
    });
}

module.exports.selectAnimalById = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectAnimalById(id, schema)
        .then(animal => {
            res.status(200).json(animal);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.selectFather = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectFather(id, schema)
        .then(animal => {
            res.status(200).json(animal);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.selectMother = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectMother(id, schema)
        .then(animal => {
            res.status(200).json(animal);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}

module.exports.deleteAnimal = (req, res, next) => {
    const id = Number(req.params.id);
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    deleteAnimal(id, schema)
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

module.exports.updateAnimal = (req, res, next) => {
    const id = Number(req.params.id);
    const nome_animal = req.body.nome_animal;
    const nro_controle = req.body.nro_controle;
    const data_nascimento = req.body.data_nascimento;
    const sexo = req.body.sexo;
    const matriz = req.body.matriz;
    const rebanho = req.body.rebanho;
    const registrado = req.body.registrado;
    const id_pai = req.body.id_pai;
    const id_mae = req.body.id_mae;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateAnimal(id, nome_animal, nro_controle, data_nascimento, sexo, matriz, rebanho, registrado, id_pai, id_mae, schema)
        .then(animal => {
            res.json({animal});
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err)
        });
}