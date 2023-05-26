import httpStatus from 'http-status';

export enum Status {
    Error = 'error',
    Fail = 'fail'
}

export class APIError extends Error {
    statusCode: number;
    status: Status;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? Status.Fail : Status.Error;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string): APIError {
        return new APIError(message, httpStatus.BAD_REQUEST);
    }

    static notFound(message: string): APIError {
        return new APIError(message, httpStatus.NOT_FOUND);
    }

    static internal(message: string): APIError {
        return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR);
    }

    static unauthorized(message: string): APIError {
        return new APIError(message, httpStatus.UNAUTHORIZED);
    }

    static forbidden(message: string): APIError {
        return new APIError(message, httpStatus.FORBIDDEN);
    }
}
