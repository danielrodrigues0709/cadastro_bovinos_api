const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listMedicamentos = async (medicamento, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE 
    ( '${medicamento}' = '' OR '${medicamento}' IS NULL OR '${medicamento}' = 'undefined' OR medicamento ILIKE '%${medicamento}%')`); 
    return retorno;
}

module.exports.insertMedicamento = async (medicamento, principio_ativo, schema) => {
    const retorno = {
        data: await dbQuery(`INSERT INTO ${schema}medicamentos(medicamento, principio_ativo) VALUES('${medicamento}', '${principio_ativo}') RETURNING *`),
        message: `${MSGS.registroCriado}`
    };
    return retorno;
}

module.exports.selectMedicamentoById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE id = ${id}`);
    return retorno;
}

module.exports.selectMedicamentoByDesc = async (medicamento, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE medicamento ILIKE '%${medicamento}%'`);
    return retorno;
}

module.exports.deleteMedicamento = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}medicamentos WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateMedicamento = async (medicamento, principio_ativo, id, schema) => {
    const retorno = {
        data: await dbQuery(`UPDATE ${schema}medicamentos SET medicamento = '${medicamento}', principio_ativo = '${principio_ativo}' WHERE id = ${id} RETURNING *`),
        message: `${MSGS.registroAtualizado}`
    };
    return retorno;
}