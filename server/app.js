const express = require('express');
const morgan = require('morgan');

// Import Routes
const tourRouter = require('./routes/tours.routes');

// Create express app
const app = express();

// App Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());

app.use('/api/v1/tours', tourRouter);

module.exports = app;
