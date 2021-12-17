const http = require('http');

const app = require('./app');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT);
server.on('listening', () => console.log(`Server listening on http://${HOST}:${PORT}`));
