import express, { Request, Response } from 'express'

import { toursRouter } from './tours/tours.router'

const apiRouter = express.Router()

/**
 * @desc: Health check route
 * @endpoint: GET /api/v1/healthcheck
 */
apiRouter.get('/healthcheck', (_: Request, res: Response) => {
  res.json('OK!')
})

// Register new routes here 👇🏼
/**
 * @desc: Tours routes
 * @endpoint: GET /api/v1/tours
 */
apiRouter.use('/tours', toursRouter)

export { apiRouter }
