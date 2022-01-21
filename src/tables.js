const { openConnection } = require("../db");
const { MSGS } = require("../msgs");

const db =  openConnection();

class Tabelas {
    createMedicamentosTable() {
        db.run(`CREATE TABLE IF NOT EXISTS medicamentos (id INTEGER PRIMARY KEY AUTOINCREMENT,medicamento STRING)`, (err) => {
            if(err) {
                console.log(MSGS.erroTabela, err);
            }
            else {
                console.log(MSGS.tabelaCriada);
            }
        })

        db.close(() => {
            console.log(MSGS.fechaConexao);
        });
    }

    deleteMedicamentosTable() {
        db.run(`DROP TABLE medicamentos`, (err) => {  
            if(err) {
                console.log(err);
            }
            else console.log(MSGS.tabelaDeletada);
        });

        db.close(() => {
            console.log(MSGS.conexaoFechada);
        });
    }
}

module.exports.Tabelas = new Tabelas();