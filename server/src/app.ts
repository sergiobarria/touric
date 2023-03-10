import express, { NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'

import { apiRouter } from './routes'
import { morganMiddleware } from './middleware/morgan.middleware'
import { APIError } from './shared/utils/apiError'
import { globalErrorHandler } from './routes/error.controller'

const app = express()

// Apply Middleware here 👇🏼
app.use(helmet()) // Set security HTTP headers
app.use(express.json({ limit: '10kb' })) // Limit request body size to 10kb
app.use(morganMiddleware)

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter) // Limit requests from same API

app.use(mongoSanitize()) // Data sanitization against NoSQL query injection

app.use(xss()) // Data sanitization against XSS

app.use(hpp({ whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'] })) // Prevent parameter pollution

// Apply Routes here 👇🏼
app.use('/api/v1', apiRouter)

app.all('*', (req: Request, _: Response, next: NextFunction) => {
  next(APIError.notFound(`Can't find ${req.originalUrl} on this server!`))
})

app.use(globalErrorHandler)

export { app }
