import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from 'config';

import { APIError, logger } from '@/utils';
import { envs } from '@/constants';

function handleCastErrorDB(err: APIError): APIError {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new APIError(message, httpStatus.BAD_REQUEST);
}

function handleDuplicateFieldsDB(err: APIError): APIError {
    const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new APIError(message, httpStatus.CONFLICT);
}

function sendErrorDev(err: APIError, res: Response): void {
    res.status(err.statusCode).json({
        success: err.success,
        statusCode: err.statusCode,
        error: err,
        message: err.message,
        stack: err.stack,
    });
}

function sendErrorProd(err: APIError, res: Response): void {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: err.success,
            statusCode: err.statusCode,
            message: err.message,
        });
    } else {
        logger.error('ERROR 💥', err);

        // Programming or other unknown error: don't leak error details
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong!',
        });
    }
}

export const globalErrorHandler = (err: APIError, _: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    err.success = err.success ?? false;

    const NODE_ENV = config.get<string>('NODE_ENV');

    if (NODE_ENV === envs.PRODUCTION) {
        sendErrorDev(err, res);
    } else if (NODE_ENV === envs.DEVELOPMENT) {
        let error = { ...err };
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError') error = APIError.badRequest(error.message);

        sendErrorProd(error, res);
    }
};
