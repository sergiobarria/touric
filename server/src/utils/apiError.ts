import httpStatus from 'http-status';

enum Status {
    FAIL = 'fail',
    ERROR = 'error',
}

export class APIError extends Error {
    public statusCode: number;
    public status: Status;
    public isOperational: boolean;
    public success: boolean;
    public path?: string;
    public value?: string;
    public code?: number;
    public errmsg?: string;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? Status.FAIL : Status.ERROR;
        this.isOperational = true;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string): APIError {
        return new APIError(message, httpStatus.BAD_REQUEST);
    }

    static unauthorized(message: string): APIError {
        return new APIError(message, httpStatus.UNAUTHORIZED);
    }

    static forbidden(message: string): APIError {
        return new APIError(message, httpStatus.FORBIDDEN);
    }

    static notFound(message: string): APIError {
        return new APIError(message, httpStatus.NOT_FOUND);
    }

    static methodNotAllowed(message: string): APIError {
        return new APIError(message, httpStatus.METHOD_NOT_ALLOWED);
    }

    static conflict(message: string): APIError {
        return new APIError(message, httpStatus.CONFLICT);
    }

    static notImplemented(message: string): APIError {
        return new APIError(message, httpStatus.NOT_IMPLEMENTED);
    }
}
