import config from 'config'
import express, { type NextFunction, type Request, type Response } from 'express'

import { morganMiddleware, toursMiddleware, globalErrorMiddleware } from './middlewares'
import { routerV1 } from './router/v1'
import { prisma } from './lib'
import { APIError } from './utils'

export const app = express()

// ===== Register Middleware 👇🏼 =====
app.use(express.json())
if (config.get('NODE_ENV') === 'development') {
    app.use(morganMiddleware)
}

// ===== Register Routes 👇🏼 =====
app.use('/api/v1', routerV1)

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(APIError.notFound(`cannot find ${req.originalUrl} on this server`))
})

app.use(globalErrorMiddleware)

// ===== Register Prisma Middleware 👇🏼 =====
prisma.$use(toursMiddleware)
