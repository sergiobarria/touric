const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./tour.controller');

const toursRouter = express.Router();

toursRouter.route('/').get(getAllTours).post(createTour);

toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = toursRouter;
