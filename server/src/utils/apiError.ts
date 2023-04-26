import httpStatus from 'http-status'

export class APIError extends Error {
    public statusCode: number
    public status: 'fail' | 'error'
    public isOperational: boolean

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message: string): APIError {
        return new APIError(message, httpStatus.BAD_REQUEST)
    }

    static unauthorized(message: string): APIError {
        return new APIError(message, httpStatus.UNAUTHORIZED)
    }

    static forbidden(message: string): APIError {
        return new APIError(message, httpStatus.FORBIDDEN)
    }

    static notFound(message: string): APIError {
        return new APIError(message, httpStatus.NOT_FOUND)
    }

    static internal(message: string): APIError {
        return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR)
    }

    static notImplemented(message: string): APIError {
        return new APIError(message, httpStatus.NOT_IMPLEMENTED)
    }

    static serviceUnavailable(message: string): APIError {
        return new APIError(message, httpStatus.SERVICE_UNAVAILABLE)
    }
}
