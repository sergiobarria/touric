/* eslint-disable @typescript-eslint/space-before-function-paren */
import httpStatus from 'http-status'

export class APIError extends Error {
  statusCode: number
  status: 'fail' | 'error'
  isOperational: boolean

  constructor(
    message: string,
    status: string,
    statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true
  ) {
    super(message)

    this.statusCode = statusCode
    this.status = `${status}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.BAD_REQUEST)
  }

  static unauthorized(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.UNAUTHORIZED)
  }

  static forbidden(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.FORBIDDEN)
  }

  static notFound(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.NOT_FOUND)
  }

  static conflict(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.CONFLICT)
  }

  static tooMany(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.TOO_MANY_REQUESTS)
  }

  static internal(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.INTERNAL_SERVER_ERROR)
  }

  static notImplemented(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.NOT_IMPLEMENTED)
  }

  static badGateway(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.BAD_GATEWAY)
  }

  static serviceUnavailable(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.SERVICE_UNAVAILABLE)
  }

  static gatewayTimeout(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.GATEWAY_TIMEOUT)
  }

  static dbError(message: string): APIError {
    return new APIError(message, 'fail', httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class CastError extends APIError {
  constructor(message: string) {
    super(message, 'error', httpStatus.BAD_REQUEST)
  }
}

export class DuplicatedKeyError extends APIError {
  constructor(message: string) {
    super(message, 'error', httpStatus.CONFLICT)
  }
}

export class ValidationError extends APIError {
  constructor(message: string) {
    super(message, 'error', httpStatus.BAD_REQUEST)
  }
}
