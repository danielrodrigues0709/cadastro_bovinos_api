const { openConnection } = require("../db");
const { MSGS } = require("../msgs");

const db =  openConnection();

class Tabelas {
    createMedicamentosTable() {
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

    deleteMedicamentosTable() {
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
}

module.exports.Tabelas = new Tabelas();