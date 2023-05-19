import express from 'express';

import { createTour, deleteTour, getTour, getTours, updateTour } from '@/controllers';

const router = express.Router();

router.route('/').get(getTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export { router as toursRouter };
