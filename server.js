const http = require('http');
const app = require('./index');
const { MSGS } = require('./msgs');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => console.log(`${MSGS.servidor} ${port}`));