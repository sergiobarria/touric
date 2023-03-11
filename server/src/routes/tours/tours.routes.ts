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
import { protectRoute } from '@/middleware/protectRoute.middleware'
import { restrictTo } from '@/middleware/restrictTo.middleware'
import { Role } from '@/models/user.model'

const router = express.Router()

router.route('/top-five-tours').get(aliasTopTours, getTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

router.route('/').get(protectRoute, getTours).post(validateResource(createTourSchema), createTour)

router
  .route('/:id')
  .get(validateResource(getTourSchema), getTour)
  .patch(validateResource(updateTourSchema), updateTour)
  .delete(protectRoute, restrictTo(Role.ADMIN, Role.LEAD_GUIDE), validateResource(deleteTourSchema), deleteTour)

export { router as toursRouter }
