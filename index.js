const express = require('express');
const http = require('http');

const { MSGS } = require('./msgs');
const { Tabelas } = require('./src/tables');

const PORT = process.env.PORT || 3333;

const app = express();
const httpServer = http.createServer(app);

// Inicia servidor
module.exports.startServer = () => {
  httpServer.listen(PORT, () => console.log(`${MSGS.servidor} ${PORT}`));
}

// Fecha servidor
module.exports.shutDownServer = () => {
    httpServer.close(err => {
      if(err)
          console.log(err);
      else console.log(MSGS.servidorDesligado);
  });
}

// Rota de teste
app.get('/', (req, res) => {
    res.send(`${MSGS.servidor} ${PORT}`);
})

// Para uso de rotas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cria tabelas
Tabelas.createMedicamentosTable();
// Tabelas.deleteMedicamentosTable();