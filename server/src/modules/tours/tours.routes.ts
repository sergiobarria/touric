import express from 'express'

import { routes } from '@/shared/constants/routes'
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour
} from '@/modules/tours/tours.controller'
import { validateResource } from '@/middleware/validateResource.middleware'
import { createTourSchema, deleteTourSchema, updateTourSchema } from '@/modules/tours/tours.schema'

const router = express.Router()

router.route(routes.tours).get(getAllTours).post(validateResource(createTourSchema), createTour)

router
  .route(routes.tour)
  .get(getTour)
  .patch(validateResource(updateTourSchema), updateTour)
  .delete(validateResource(deleteTourSchema), deleteTour)

export { router as toursRouter }
