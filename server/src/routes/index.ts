import express, { Request, Response } from 'express'

const apiRouter = express.Router()

/**
 * @desc: Health check route
 * @endpoint: GET /api/v1/healthcheck
 */
apiRouter.get('/healthcheck', (_: Request, res: Response) => {
  res.json('OK!')
})

// Register new routes here 👇🏼
/**
 * @desc: Example route
 * @endpoint: GET /api/v1/example
 * @example: GET /api/v1/example
 */
// const exampleRouter = './example' // 👈🏼 Import the router
// apiRouter.get('/example', exampleRouter)

export { apiRouter }
