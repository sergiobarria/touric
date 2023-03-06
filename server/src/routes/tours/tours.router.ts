import express from 'express'

import { createTour, deleteTour, getTour, getTours, updateTour } from './tours.controller'
import { validateResource } from '@/middleware/validateResource'
import {
  createTourSchema,
  deleteTourSchema,
  getTourSchema,
  updateTourSchema
} from './tours.schemas'

const router = express.Router()

router.route('/').get(getTours).post(validateResource(createTourSchema), createTour)

router
  .route('/:id')
  .get(validateResource(getTourSchema), getTour)
  .patch(validateResource(updateTourSchema), updateTour)
  .delete(validateResource(deleteTourSchema), deleteTour)

export { router as toursRouter }
