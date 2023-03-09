import express from 'express'

import {
  aliasTopTours,
  createTour,
  deleteTour,
  getMonthlyPlan,
  getTour,
  getTours,
  getTourStats,
  updateTour
} from './tours.controller'
import { validateResource } from '@/middleware/validateResource.middleware'
import { createTourSchema, deleteTourSchema, getTourSchema, updateTourSchema } from './tours.schemas'

const router = express.Router()

router.route('/top-five-tours').get(aliasTopTours, getTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

router.route('/').get(getTours).post(validateResource(createTourSchema), createTour)

router
  .route('/:id')
  .get(validateResource(getTourSchema), getTour)
  .patch(validateResource(updateTourSchema), updateTour)
  .delete(validateResource(deleteTourSchema), deleteTour)

export { router as toursRouter }
