const { openConnection } = require("../db");
const { MSGS } = require("../msgs");

const db =  openConnection();

module.exports.createMedicamentosTable = () => {
    db.query(`CREATE TABLE IF NOT EXISTS medicamentos (id SERIAL PRIMARY KEY,medicamento VARCHAR(50))`, (err) => {
        if(err) {
            console.log(MSGS.erroTabela, err);
        }
        else {
            console.log(MSGS.tabelaCriada);
        }
    })

    db.end(() => {
        console.log(MSGS.fechaConexao);
    });
}

module.exports.deleteMedicamentosTable = () => {
    db.query(`DROP TABLE medicamentos`, (err) => {  
        if(err) {
            console.log(err);
        }
        else console.log(MSGS.tabelaDeletada);
    });

    db.end(() => {
        console.log(MSGS.conexaoFechada);
    });
}