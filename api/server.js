const config = require('config');
process.env.PORT = config.get("apiConfig.port");

const app = require('./src/app');
const http = require('http');
const db = require('./src/db');

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Start listening for requests
 */
db.connect().then(()=>{
    console.log('Database connected');
    server.listen(process.env.PORT);
});
