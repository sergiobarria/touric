import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validateResource = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })

      next()
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: {
            type: 'Validation Error',
            details: err.errors
          }
        })
      }

      return res.status(400).json({
        message: err.errors[0].message
      })
    }
  }
}
