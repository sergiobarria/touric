import express from 'express'

import * as toursController from './tours.controller'

const router = express.Router()

router.route('/').get(toursController.getToursHandler).post(toursController.createTourHandler)
router
    .route('/:id')
    .get(toursController.getTourHandler)
    .patch(toursController.updateTourHandler)
    .delete(toursController.deleteTourHandler)

export { router as toursRouter }
