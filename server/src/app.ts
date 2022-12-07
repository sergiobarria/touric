import express from 'express'

import { morganMiddleware } from '@/middleware/morgan.middleware'
import { routes } from '@/shared/constants/routes'
import { apiRouter } from '@/router'
import { notFound, globalErrorHandler } from '@/middleware/error.middleware'

const app = express()

// App Middlewares
app.use(express.json())
app.use(morganMiddleware)

/**
 * @description: API Routes
 * @prefix: /api/v1
 * @example: /api/v1/healthcheck
 */
app.use(routes.prefix, apiRouter)

// Not found route
app.use(notFound)

// Error Handling Middleware
app.use(globalErrorHandler)

export default app
