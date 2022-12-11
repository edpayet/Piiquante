const express = require('express');
require('dotenv').config();
const http = require('http');

const app = express();

const port = 3000;
app.set('port', port);

const server = http.createServer(app);
server.on('listening', () => {
    const address = server.address();
    const bind =
        typeof address === 'string' ? `pipe ' ${address}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
});

server.listen(port);
