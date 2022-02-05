const { dbQuery } = require("../db");
const { MSGS } = require("../msgs");

module.exports.createSchemaSql = async (nome_schema) => {
    await dbQuery(`CREATE SCHEMA IF NOT EXISTS ${nome_schema}`);
    return `${MSGS.schemaCriado}`;
}
