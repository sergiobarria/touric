import express from 'express';

import { createTour, deleteTour, getTour, getTours, updateTour } from './tours.controller';
import { validate } from '@/middlewares';
import { createTourSchema, getTourSchema, updateTourSchema } from './tours.schemas';

const router = express.Router();

router.route('/').get(getTours).post(validate(createTourSchema), createTour);

router
    .route('/:id')
    .get(validate(getTourSchema), getTour)
    .patch(validate(updateTourSchema), updateTour)
    .delete(validate(getTourSchema), deleteTour);

export { router as toursRouter };
