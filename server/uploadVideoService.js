const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3001;



const server = http.createServer((req, res) => {
    
    if (req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
    });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});