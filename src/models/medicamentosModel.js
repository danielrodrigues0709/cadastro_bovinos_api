const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listMedicamentos = async (schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos`, []); 
    return retorno;
}

module.exports.insertMedicamento = async (medicamento, schema) => {
    await dbQuery(`INSERT INTO ${schema}medicamentos(medicamento) VALUES('${medicamento}')`);
    return `${MSGS.registroCriado}`;
}

module.exports.selectMedicamentoById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE id = ${id}`);
    return retorno;
}

module.exports.selectMedicamentoByDesc = async (medicamento, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}medicamentos WHERE medicamento LIKE '%${medicamento}%'`);
    return retorno;
}

module.exports.deleteMedicamento = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}medicamentos WHERE id = ${id}`);
    return `${MSGS.registroDeletado} ${id}`; 
}

module.exports.updateMedicamento = async (medicamento, id, schema) => {
    await dbQuery(`UPDATE ${schema}medicamentos SET medicamento = '${medicamento}' WHERE id = ${id}`);
    return this.selectMedicamento(id, schema);
}