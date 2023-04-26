import type { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import type { APIError } from '@/utils'

export const globalErrorMiddleware = (err: APIError, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR
    err.status = err.status ?? 'error'

    res.status(err.statusCode).json({
        success: 'false',
        message: err.message
    })
}
