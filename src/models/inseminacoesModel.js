const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listInseminacoes = async (id_animal, id_reprodutor, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}inseminacoes WHERE 
        ( ${id_animal} IS NULL OR id_animal = ${id_animal}) AND
        ( ${id_reprodutor} IS NULL OR id_reprodutor = ${id_reprodutor})`);
    return retorno;
}

module.exports.insertInseminacao = async (data_inseminacao, data_previsao_parto, id_animal, id_reprodutor, schema) => {
    const retorno = {
        data: await dbQuery(`INSERT INTO ${schema}inseminacoes(data_inseminacao, data_previsao_parto, id_animal, id_reprodutor) VALUES('${data_inseminacao}', '${data_previsao_parto}',${id_animal}, ${id_reprodutor}) RETURNING *`),
        message: `${MSGS.registroCriado}`
    };
    return retorno;
}

module.exports.selectInseminacaoById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}inseminacoes WHERE id = ${id}`);
    return retorno;
}

module.exports.deleteInseminacao = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}inseminacoes WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateInseminacao = async (data_inseminacao, data_previsao_parto, id_animal, id_reprodutor, id, schema) => {
    const retorno = {
        data: await dbQuery(`UPDATE ${schema}inseminacoes SET data_inseminacao = '${data_inseminacao}', data_previsao_parto = '${data_previsao_parto}', id_animal = ${id_animal}, id_reprodutor = ${id_reprodutor} WHERE id = ${id} RETURNING *`),
        message: `${MSGS.registroAtualizado}`
    };
    return retorno;
}