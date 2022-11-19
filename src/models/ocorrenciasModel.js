const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listOcorrencias = async (id_animal, id_medicamento, morte, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}ocorrencias WHERE 
    ( ${id_animal} IS NULL OR id_animal = ${id_animal}) AND
    ( ${id_medicamento} IS NULL OR id_medicamento = ${id_medicamento}) AND
    ( ${morte} IS NULL OR morte = ${morte})`);
    return retorno;
}

module.exports.insertOcorrencia = async (data_ocorrencia, descricao, id_animal, id_medicamento, morte, schema) => {
    await dbQuery(`INSERT INTO ${schema}ocorrencias(data_ocorrencia, descricao, id_animal, id_medicamento) VALUES('${data_ocorrencia}', '${descricao}', ${id_animal}, ${id_medicamento}, ${morte})`);
    return `${MSGS.registroCriado}`;
}

module.exports.selectOcorrenciaById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}ocorrencias WHERE id = ${id}`);
    return retorno;
}

module.exports.deleteOcorrencia = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}ocorrencias WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateOcorrencia = async (data_ocorrencia, descricao, id_animal, id_medicamento, morte, id, schema) => {
    await dbQuery(`UPDATE ${schema}ocorrencias SET data_ocorrencia = '${data_ocorrencia}', descricao = '${descricao}', id_animal = ${id_animal}, id_medicamento = ${id_medicamento}, morte = ${morte} WHERE id = ${id}`);
    return `${MSGS.registroAtualizado}`;
}