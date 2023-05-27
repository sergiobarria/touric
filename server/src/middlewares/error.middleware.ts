import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from 'config';

import { APIError } from '@/lib';
import { envs } from '@/constants';
import { logger } from '@/utils';

function handleCastErrorDB(err: any): APIError {
    const message = `Invalid ${err.path}: ${err.value}.`;

    return APIError.badRequest(message);
}

function handleDuplicateFieldsDB(err: any): APIError {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log({ value });
    const message = `Duplicate field value: ${value}. Please use another value!`;

    return APIError.badRequest(message);
}

function sendErrorDev(err: APIError, res: Response): void {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: { ...err },
        stack: err.stack
    });
}

function sendErrorProd(err: APIError, res: Response): void {
    if (err.isOperational) {
        // Operational, trusted error: send message to client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        logger.error('💥 ERROR: ', err);

        // Programming or other unknown error: don't leak error details to the client
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong!'
        });
    }
}

export function globalErrorMiddleware(err: APIError, _: Request, res: Response, next: NextFunction): void {
    const NODE_ENV = config.get<string>('NODE_ENV');
    err.statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    err.status = err.status ?? 'error';

    if (NODE_ENV !== envs.development) {
        sendErrorDev(err, res);
    } else if (NODE_ENV === envs.development) {
        let error = Object.assign(err);

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = APIError.badRequest(error.message);

        sendErrorProd(error, res);
    }
}
