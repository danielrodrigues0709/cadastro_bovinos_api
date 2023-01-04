const { listAnimais, selectAnimalById, insertAnimal, deleteAnimal, updateAnimal, selectFather, selectMother, selectAnimalNumControle, selectAnimalByDesc } = require("../models/animaisModel");
const { MSGS } = require("../../msgs");

module.exports.listAnimais = (req, res, next) => {
    const nome_animal = req.query.nome_animal;
    const nro_controle = req.query.nro_controle;
    const sexo = req.query.sexo;
    const matriz = req.query.matriz;
    const producao = req.query.producao;
    const rebanho = req.query.rebanho;
    const registrado = req.query.registrado;
    const id_reprodutor = req.query.id_reprodutor;
    const id_mae = req.query.id_mae;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    
    listAnimais(
        nome_animal,
        nro_controle ? nro_controle : null,
        sexo ? sexo : null,
        matriz ? matriz : null,
        producao ? producao : null,
        rebanho ? rebanho : null,
        registrado ? registrado : null,
        id_reprodutor ? id_reprodutor : null,
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
    const producao = req.body.producao;
    const rebanho = req.body.rebanho;
    const registrado = req.body.registrado;
    const id_reprodutor = req.body.id_reprodutor;
    const id_mae = req.body.id_mae;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectAnimalNumControle(nro_controle, schema).then(response => {
        if(response.rowCount > 0) {
            return res.status(422).json({
                message: MSGS.registroExistente
            });
        }
        else {
            insertAnimal(nome_animal, nro_controle, data_nascimento, sexo, matriz, producao, rebanho, registrado, id_reprodutor, id_mae, schema)
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

module.exports.selectAnimalByDesc = (req, res, next) => {
    const nome_animal = req.params.nome_animal;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    selectAnimalByDesc(nome_animal, schema)
        .then(animal => {
            res.status(200).json(animal);
            next();
        })
        .catch(err => {
            res.status(422).json({
                message: MSGS.erroRequisicao
            });
            console.log(err);
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
    const producao = req.body.producao;
    const rebanho = req.body.rebanho;
    const registrado = req.body.registrado;
    const id_reprodutor = req.body.id_reprodutor;
    const id_mae = req.body.id_mae;
    const schema = req.headers.schema ? req.headers.schema+'.': '';
    updateAnimal(id, nome_animal, nro_controle, data_nascimento, sexo, matriz, producao, rebanho, registrado, id_reprodutor, id_mae, schema)
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