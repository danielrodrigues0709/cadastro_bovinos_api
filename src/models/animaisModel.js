const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listAnimais = async (nome_animal, nro_controle, sexo, matriz, producao, rebanho, registrado, id_reprodutor, id_mae, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}animais WHERE 
        ( '${nome_animal}' = '' OR '${nome_animal}' IS NULL OR '${nome_animal}' = 'undefined' OR nome_animal ILIKE '%${nome_animal}%') AND
        ( ${nro_controle} IS NULL OR nro_controle = ${nro_controle}) AND
        ( ${sexo} IS NULL OR sexo = ${sexo}) AND
        ( ${matriz} IS NULL OR matriz = ${matriz}) AND
        ( ${producao} IS NULL OR producao = ${producao}) AND
        ( ${rebanho} IS NULL OR rebanho = ${rebanho}) AND
        ( ${registrado} IS NULL OR registrado = ${registrado}) AND
        ( ${id_reprodutor} IS NULL OR id_reprodutor = ${id_reprodutor}) AND
        ( ${id_mae} IS NULL OR id_mae = ${id_mae})`);
    return retorno;
}

module.exports.insertAnimal = async (nome_animal, nro_controle, data_nascimento, sexo, matriz, producao, rebanho, registrado, id_reprodutor, id_mae, schema) => {
    const retorno = {
        data: await dbQuery(`INSERT INTO ${schema}animais(nome_animal, nro_controle, data_nascimento, sexo, matriz, producao, rebanho, registrado, id_reprodutor, id_mae
        ) VALUES(
            '${nome_animal}',
            ${nro_controle},
            '${data_nascimento}',
            ${sexo},
            ${matriz},
            ${producao},
            ${rebanho},
            ${registrado},
            ${id_reprodutor},
            ${id_mae}
        ) RETURNING *`),
        message: `${MSGS.registroCriado}`
    };
    return retorno;
}

module.exports.selectAnimalById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}animais WHERE id = ${id}`);
    return retorno;
}

module.exports.selectAnimalByDesc = async (nome_animal, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}animais WHERE nome_animal ILIKE '%${nome_animal}%'`);
    return retorno;
}

module.exports.selectAnimalNumControle = async (nro_controle, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}animais WHERE nro_controle = ${nro_controle}`);
    return retorno;
}

module.exports.selectAnimalNumMatriz = async (matriz, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}animais WHERE matriz = ${matriz}`);
    return retorno;
}

module.exports.selectFather = async (id, schema) => {
    const retorno = await dbQuery(`SELECT p.* FROM ${schema}animais f
    JOIN ${schema}animais p ON f.id_reprodutor = p.id
    WHERE f.id = ${id}`);
    return retorno;
}

module.exports.selectMother = async (id, schema) => {
    const retorno = await dbQuery(`SELECT m.* FROM ${schema}animais f
    JOIN ${schema}animais m ON f.id_mae = m.id
    WHERE f.id = ${id}`);
    return retorno;
}

module.exports.selectAnimalRebanho = async (schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}animais WHERE rebanho = true`);
    return retorno;
}

module.exports.deleteAnimal = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}animais WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateAnimal = async (id, nome_animal, nro_controle, data_nascimento, sexo, matriz, producao, rebanho, registrado, id_reprodutor, id_mae, schema) => {
    const retorno = {
        data: await dbQuery(`UPDATE ${schema}animais SET 
        nome_animal = '${nome_animal}',
        nro_controle = ${nro_controle},
        data_nascimento = '${data_nascimento}',
        sexo = ${sexo},
        matriz = ${matriz},
        producao = ${producao},
        rebanho = ${rebanho},
        registrado = ${registrado},
        id_reprodutor = ${id_reprodutor},
        id_mae = ${id_mae}
        WHERE id = ${id}
        RETURNING *`),
        message: `${MSGS.registroAtualizado}`
    };
    return retorno;
}