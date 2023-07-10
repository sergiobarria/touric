import express from 'express';

import {
    createTourHandler,
    deleteTourHandler,
    getTourHandler,
    getToursHandler,
    updateTourHandler,
} from './tours.controller';

const router = express.Router();

router.route('/').get(getToursHandler).post(createTourHandler);

router.route('/:id').get(getTourHandler).patch(updateTourHandler).delete(deleteTourHandler);

export { router as toursRouter };
