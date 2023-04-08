import express, { type Request, type Response } from 'express'
import httpStatus from 'http-status'

import { toursRouter } from './v1/tours/tours.router'
import { usersRouter } from './v1/users/users.router'

const router = express.Router()

/**
 * @desc: Healthcheck endpoint
 * @endpoint: /api/v1/healthcheck
 */
router.get('/healthcheck', (_: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        success: true,
        message: 'server is running',
        details: {
            name: 'Touric Server API',
            version: '1.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage()
        }
    })
})

// ===== Register Other routes here 👇🏼 =====
router.use('/tours', toursRouter) // /api/v1/tours
router.use('/users', usersRouter) // /api/v1/users

export { router as routerV1 }
