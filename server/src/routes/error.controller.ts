import { APIError } from '@/shared/utils/apiError'
import { NextFunction, Request, Response } from 'express'

export const globalErrorHandler = (err: APIError, _: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode ?? 500
  err.status = err.status ?? 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}
