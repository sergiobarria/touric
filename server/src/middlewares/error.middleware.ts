import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import type { APIError } from '@/lib';

export function globalErrorMiddleware(err: APIError, req: Request, res: Response, next: NextFunction): Response {
    err.statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    err.status = err.status ?? 'error';

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}
