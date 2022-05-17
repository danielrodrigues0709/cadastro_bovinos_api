const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listVacinas = async (vacina_vermifugo, tipo, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}vacinas WHERE 
        ( '${vacina_vermifugo}' = '' OR '${vacina_vermifugo}' IS NULL OR vacina_vermifugo ILIKE '%${vacina_vermifugo}%') AND
        ( '${tipo}' = '' OR '${tipo}' IS NULL OR tipo ILIKE '${tipo}')`);
    return retorno;
}

module.exports.insertVacina = async (vacina_vermifugo, doses, tipo, schema) => {
    await dbQuery(`INSERT INTO ${schema}vacinas(vacina_vermifugo, doses, tipo) VALUES('${vacina_vermifugo}', ${doses}, '${tipo}')`);
    return `${MSGS.registroCriado}`;
}

module.exports.selectVacinaById = async (id, schema) => {
    const retorno = await dbQuery(`SELECT * FROM ${schema}vacinas WHERE id = ${id}`);
    return retorno;
}

module.exports.deleteVacina = async (id, schema) => {
    await dbQuery(`DELETE FROM ${schema}vacinas WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateVacina = async (vacina_vermifugo, doses, tipo, id, schema) => {
    await dbQuery(`UPDATE ${schema}vacinas SET vacina_vermifugo = '${vacina_vermifugo}', doses = ${doses}, tipo = '${tipo}' WHERE id = ${id}`);
    return `${MSGS.registroAtualizado}`;
}