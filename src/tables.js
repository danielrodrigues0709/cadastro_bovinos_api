const { dbQuery } = require("../db");
const { MSGS } = require("../msgs");

module.exports.createUsuariosTable = async () => {
    await dbQuery(`CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY,usuario VARCHAR(50) UNIQUE,email VARCHAR(100),senha VARCHAR(100))`);
    console.log(MSGS.tabelaCriada, 'usuarios');
    return `${MSGS.tabelaCriada} usuarios`;
}

module.exports.createMedicamentosTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(`CREATE TABLE IF NOT EXISTS ${schema}medicamentos (id SERIAL PRIMARY KEY,medicamento VARCHAR(50))`);
    return `${MSGS.tabelaCriada} medicamentos`;
}
