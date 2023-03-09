import express, { NextFunction, Request, Response } from 'express'

import { apiRouter } from './routes'
import { morganMiddleware } from './middleware/morgan.middleware'
import httpStatus from 'http-status'
import { APIError } from './shared/utils/apiError'
import { globalErrorHandler } from './routes/error.controller'

const app = express()

// Apply Middleware here 👇🏼
app.use(express.json())
app.use(morganMiddleware)

// Apply Routes here 👇🏼
app.use('/api/v1', apiRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new APIError(`Can't find ${req.originalUrl} on this server!`, 'error', httpStatus.NOT_FOUND))
})

app.use(globalErrorHandler)

export { app }
