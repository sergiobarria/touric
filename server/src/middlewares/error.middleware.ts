import type { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from 'config'

import { APIError, logger } from '@/utils'

const handleMalformedIDError = (err: APIError): APIError => {
    const message = err.meta?.message
    return APIError.badRequest(message)
}

const sendErrorDev = (err: APIError, res: Response): void => {
    res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err: APIError, res: Response): void => {
    if (err.isOperational) {
        // Operational, trusted error: send message to client
        res.status(err.statusCode).json({
            success: 'false',
            message: err.message
        })
    } else {
        logger.error('ERROR 💥', err)

        // Send generic message
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: 'false',
            message: 'something went wrong'
        })
    }
}

export const globalErrorMiddleware = (err: APIError, req: Request, res: Response, next: NextFunction): void => {
    const env = config.get<string>('NODE_ENV')

    err.statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR
    err.status = err.status ?? 'error'

    if (env === 'development') {
        sendErrorDev(err, res)
    } else if (env === 'production') {
        let error = { ...err }

        if (error.meta?.message?.includes('Malformed ObjectID') === true) error = handleMalformedIDError(error)

        sendErrorProd(error, res)
    }
}
