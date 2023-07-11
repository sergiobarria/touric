import express from 'express';

import {
    aliasTopTours,
    createTourHandler,
    deleteTourHandler,
    getTourHandler,
    getToursHandler,
    updateTourHandler,
} from './tours.controller';
import { validate } from '@/middlewares';
import { createTourSchema, getTourSchema, updateTourSchema } from './tours.schemas';

const router = express.Router();

router.route('/top-five').get(aliasTopTours, getToursHandler);

router.route('/').get(getToursHandler).post(validate(createTourSchema), createTourHandler);

router
    .route('/:id')
    .get(validate(getTourSchema), getTourHandler)
    .patch(validate(updateTourSchema), updateTourHandler)
    .delete(deleteTourHandler);

export { router as toursRouter };
