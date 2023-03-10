import express, { NextFunction, Request, Response } from 'express'

import { apiRouter } from './routes'
import { morganMiddleware } from './middleware/morgan.middleware'
import { APIError } from './shared/utils/apiError'
import { globalErrorHandler } from './routes/error.controller'

const app = express()

// Apply Middleware here 👇🏼
app.use(express.json())
app.use(morganMiddleware)

// Apply Routes here 👇🏼
app.use('/api/v1', apiRouter)

app.all('*', (req: Request, _: Response, next: NextFunction) => {
  next(APIError.notFound(`Can't find ${req.originalUrl} on this server!`))
})

app.use(globalErrorHandler)

export { app }
