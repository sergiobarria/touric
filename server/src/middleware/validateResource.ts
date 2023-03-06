import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validateResource = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })

      next()
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          message: error.flatten()
        })
      }

      return res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  }
}
