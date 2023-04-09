import express from 'express'

import { validate } from '@/middlewares'
import * as controller from './tours.controller'
import * as schemas from './tours.schemas'

const router = express.Router()

router.route('/').get(controller.getToursHandler).post(validate(schemas.createTourSchema), controller.createTourHandler)
router
    .route('/:id')
    .get(validate(schemas.getTourSchema), controller.getTourHandler)
    .patch(validate(schemas.updateTourSchema), controller.updateTourHandler)
    .delete(validate(schemas.getTourSchema), controller.deleteTourHandler)

export { router as toursRouter }
