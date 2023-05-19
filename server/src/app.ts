import express, { type Express } from 'express'

export const app: Express = express()

// ===== Register Middleware 👇🏼 =====
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ===== Register Routes 👇🏼 =====
