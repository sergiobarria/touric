import express from 'express';

import {
    aliasTopTours,
    createTour,
    deleteTour,
    getMonthlyPlan,
    getTour,
    getTourStats,
    getTours,
    updateTour
} from './tours.controller';
import { validate } from '@/middlewares';
import { createTourSchema, getTourSchema, updateTourSchema } from './tours.schemas';

const router = express.Router();

router.route('/top-five').get(aliasTopTours, getTours);

router.route('/stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getTours).post(validate(createTourSchema), createTour);

router
    .route('/:id')
    .get(validate(getTourSchema), getTour)
    .patch(validate(updateTourSchema), updateTour)
    .delete(validate(getTourSchema), deleteTour);

export { router as toursRouter };
