import express from 'express'
import config from 'config'

import { morganMiddleware } from './middlewares'

export const app = express()

// ===== Register Middleware 👇🏼 =====
app.use(express.json())
if (config.get('NODE_ENV') === 'development') {
    app.use(morganMiddleware)
}

// ===== Register Routes 👇🏼 =====

// ===== Register Prisma Middleware 👇🏼 =====
