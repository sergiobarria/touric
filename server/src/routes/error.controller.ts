import { Request, Response } from 'express'

import { APIError } from '@/shared/utils/apiError'

export const globalErrorHandler = (err: APIError, _: Request, res: Response): void => {
  err.statusCode = err.statusCode ?? 500
  err.status = err.status ?? 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}
