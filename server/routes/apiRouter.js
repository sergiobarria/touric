const express = require('express');

const toursRouter = require('./tours/tour.router');

const apiRouter = express.Router();

apiRouter.use('/tours', toursRouter);

module.exports = apiRouter;
