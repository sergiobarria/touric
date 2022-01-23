const path = require('path');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const errorHandler = require('./middleware/error.middleware');

// Import Router
const apiRouter = require('./routes/apiRouter');

// Create express app
const app = express();

// App Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App Routes
app.use('/api/v1', apiRouter);

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
