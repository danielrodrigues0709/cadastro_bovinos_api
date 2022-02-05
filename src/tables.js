const { openConnection } = require("../db");
const { MSGS } = require("../msgs");

const db =  openConnection();

module.exports.createUsuariosTable = async () => {
    await db.query(`CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY,usuario VARCHAR(50),email VARCHAR(100),senha VARCHAR(100))`, (err) => {
        if(err) {
            console.log(MSGS.erroTabela, 'usuarios', err);
        }
        else console.log(MSGS.tabelaCriada, 'usuarios');

        db.end(() => {
            console.log(MSGS.fechaConexao);
        });
    })
}

module.exports.createMedicamentosTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await db.query(`CREATE TABLE IF NOT EXISTS ${schema}medicamentos (id SERIAL PRIMARY KEY,medicamento VARCHAR(50))`, (err) => {
        if(err) {
            console.log(MSGS.erroTabela, 'medicamentos', err);
        }
        else console.log(MSGS.tabelaCriada, 'medicamentos');

        db.end(() => {
            console.log(MSGS.fechaConexao);
        });
    })
}
