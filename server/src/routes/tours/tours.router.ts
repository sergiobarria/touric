import express from 'express';

import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from './tours.controller';

const router = express.Router();

/**
 * @endpoint /api/v1/tours
 */
router.route('/').get(getTours).post(createTour);

/**
 * @endpoint /api/v1/tours/:id
 */
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export { router as toursRouter };
