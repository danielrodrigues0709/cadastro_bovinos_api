const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listPartos = async (nro_controle_cria, nome_cria, id_cria, id_reprodutor, id_mae, sexo, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}partos WHERE 
    ( ${nro_controle_cria} IS NULL OR nro_controle_cria = ${nro_controle_cria}) AND
    ( '${nome_cria}' = '' OR '${nome_cria}' IS NULL OR '${nome_cria}' = 'undefined' OR nome_cria ILIKE '%${nome_cria}%') AND
    ( ${id_cria} IS NULL OR id_cria = ${id_cria}) AND
    ( ${id_reprodutor} IS NULL OR id_reprodutor = ${id_reprodutor}) AND
    ( ${id_mae} IS NULL OR id_mae = ${id_mae}) AND
    ( ${sexo} IS NULL OR sexo = ${sexo})`);
    return retorno;
}

module.exports.insertParto = async (data_parto, nro_controle_cria, nome_cria, id_cria, id_reprodutor, id_mae, sexo, schema) => {
    await dbQuery(`INSERT INTO ${schema}partos(data_parto, nro_controle_cria, nome_cria, id_cria, id_reprodutor, id_mae, sexo) VALUES('${data_parto}', ${nro_controle_cria}, '${nome_cria}', ${id_cria}, ${id_reprodutor}, ${id_mae}, ${sexo})`);
    return `${MSGS.registroCriado}`;
}

module.exports.selectPartoById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}partos WHERE id = ${id}`);
    return retorno;
}

module.exports.deleteParto = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}partos WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateParto = async (data_parto, nro_controle_cria, nome_cria, id_cria, id_reprodutor, id_mae, sexo, id, schema) => {
    await dbQuery(`UPDATE ${schema}partos SET data_parto = '${data_parto}', nro_controle_cria = ${nro_controle_cria}, nome_cria = '${nome_cria}', id_cria = ${id_cria}, id_reprodutor = ${id_reprodutor}, id_mae = ${id_mae}, sexo = ${sexo} WHERE id = ${id}`);
    return `${MSGS.registroAtualizado}`;
}