const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listMedicamentos = async (schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos`, []); 
    return retorno;
}

module.exports.insertMedicamento = async (medicamento, principio_ativo, schema) => {
    await dbQuery(`INSERT INTO ${schema}medicamentos(medicamento, principio_ativo) VALUES('${medicamento}', '${principio_ativo}')`);
    return `${MSGS.registroCriado}`;
}

module.exports.selectMedicamentoById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE id = ${id}`);
    return retorno;
}

module.exports.selectMedicamentoByDesc = async (medicamento, principio_ativo, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE medicamento ILIKE '%${medicamento}%'`);
    return retorno;
}

module.exports.deleteMedicamento = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}medicamentos WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateMedicamento = async (medicamento, principio_ativo, id, schema) => {
    await dbQuery(`UPDATE ${schema}medicamentos SET medicamento = '${medicamento}', principio_ativo = '${principio_ativo}' WHERE id = ${id}`);
    return `${MSGS.registroAtualizado}`;
}