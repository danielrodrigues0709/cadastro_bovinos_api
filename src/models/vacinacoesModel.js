const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listVacinacoes = async (id_animal, id_vacina, tipo, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}vacinacoes WHERE 
        ( ${id_animal} IS NULL OR id_animal = ${id_animal}) AND
        ( ${id_vacina} IS NULL OR id_vacina = ${id_vacina}) AND
        ( ${tipo} IS NULL OR tipo = ${tipo})`);
    return retorno;
}

module.exports.insertVacinacao = async (data_vacinacao, id_animal, id_vacina, dose, tipo, schema) => {
    const retorno = {
        data: await dbQuery(`INSERT INTO ${schema}vacinacoes(data_vacinacao, id_animal, id_vacina, dose, tipo) VALUES('${data_vacinacao}', ${id_animal}, ${id_vacina}, ${dose}, ${tipo}) RETURNING *`),
        message: `${MSGS.registroCriado}`
    };
    return retorno;
}

module.exports.selectVacinacaoById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}vacinacoes WHERE id = ${id}`);
    return retorno;
}

module.exports.deleteVacinacao = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}vacinacoes WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateVacinacao = async (data_vacinacao, id_animal, id_vacina, dose, tipo, id, schema) => {
    const retorno = {
        data: await dbQuery(`UPDATE ${schema}vacinacoes SET data_vacinacao = '${data_vacinacao}', id_animal = ${id_animal}, id_vacina = ${id_vacina}, dose = ${dose}, tipo = ${tipo} WHERE id = ${id} RETURNING *`),
        message: `${MSGS.registroAtualizado}`
    };
    return retorno;
}