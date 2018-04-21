const http = require('http');
const router = require('./router');

const server = http.createServer();
server.on('request', (req, res) => {
    router(req, res);
}).listen(80);
console.log('Server 127.0.0.1:80 starting');