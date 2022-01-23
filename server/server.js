const http = require('http');

require('dotenv').config({ path: './config.env' });
require('colors');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting server down...'); // eslint-disable-line
  console.log(err.name, err.message); // eslint-disable-line

  process.exit(1);
});

const app = require('./app');

const { mongoConnect } = require('./services/client');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Server listenting on port ${PORT}...`.yellow.bold);
  });
}

startServer();

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting server down...'); // eslint-disable-line
  console.log(err); // eslint-disable-line

  server.close(() => process.exit(1));
});
