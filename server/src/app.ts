import express from 'express'
import config from 'config'

import { morganMiddleware } from './middlewares'
import { routerV1 } from './router/v1'

export const app = express()

// ===== Register Middleware 👇🏼 =====
app.use(express.json())
if (config.get('NODE_ENV') === 'development') {
    app.use(morganMiddleware)
}

// ===== Register Routes 👇🏼 =====
app.use('/api/v1', routerV1)

// ===== Register Prisma Middleware 👇🏼 =====
