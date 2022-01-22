const http = require('http');

require('dotenv').config({ path: './config.env' });
require('colors');

const app = require('./app');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listenting on port ${PORT}...`.yellow.bold);
});
