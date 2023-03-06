import express from 'express'

import { apiRouter } from './routes'
import { morganMiddleware } from './middleware/morgan.middleware'

const app = express()

// Apply Middleware here 👇🏼
app.use(express.json())
app.use(morganMiddleware)

// Apply Routes here 👇🏼
app.use('/api/v1', apiRouter)

export { app }
