import express, { Request, Response } from 'express'

import { routes } from '@/shared/constants/routes'
import { toursRouter } from '@/modules/tours'

const router = express.Router()

/**
 * @description - API Healthcheck route
 * @access - Public
 * @routes - GET /api/v1/healthcheck
 * */
router.get(routes.healthcheck, (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK' })
})

/**
 * @description - API Tours are
 * @access - Public
 * @routes - GET, POST, PATCH, DELETE /api/v1/tours/:id
 */
router.use(toursRouter)

export { router as apiRouter }
