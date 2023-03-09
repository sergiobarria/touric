import express, { Request, Response } from 'express'

import { toursRouter } from './tours/tours.routes'
import { usersRouter } from './users/users.routes'

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

/**
 * @desc: Users routes
 * @endpoint: GET /api/v1/users
 */
apiRouter.use('/users', usersRouter)

export { apiRouter }
