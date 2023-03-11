import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import httpStatus from 'http-status'

import { APIError } from '@/shared/utils/apiError'
import { logger } from '@/shared/utils/logger'

interface ErrorMap {
  [key: string]: (fieldName?: string) => {
    status: 'fail' | 'error'
    statusCode: number
    message: string
    fieldName?: string
  }
}

const errorMap: ErrorMap = {
  CastError: value => ({
    status: 'fail',
    statusCode: httpStatus.BAD_REQUEST,
    message: value !== undefined ? `Invalid ID ${value}` : 'Invalid ID'
  }),
  ValidationError: () => ({
    status: 'fail',
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error'
  }),
  MongoServerError: value => ({
    status: 'fail',
    statusCode: httpStatus.CONFLICT,
    message: value !== undefined ? `Duplicate field value: ${value}` : 'Duplicate field value'
  }),
  default: () => ({
    status: 'error',
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error'
  })
}

const sendErrorDev = (err: APIError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
    error: err
  })
}

const sendErrorProd = (err: APIError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message
    })
  } else {
    logger.error('ERROR 💥', err)

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
  }
}

export const globalErrorHandler = (err: any, _: Request, res: Response, next: NextFunction): void => {
  let error = { ...err }
  error.message = err.message

  if (err instanceof MongooseError.CastError) {
    const { value } = err
    const errResponse = errorMap.CastError(value)
    error = { ...error, ...errResponse }
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    const fieldName = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    const errResponse = errorMap.MongoServerError(fieldName)
    error = { ...error, ...errResponse }
  } else if (err instanceof MongooseError.ValidationError) {
    const errResponse = errorMap.ValidationError()
    error = { ...error, ...errResponse }
    error.message = Object.values(err.errors).map((el: any) => el.message)
  } else if (err.name === 'JsonWebTokenError') {
    error = { ...error, ...errorMap.default }
    error.message = 'Invalid token. Please log in again!'
    error.statusCode = httpStatus.UNAUTHORIZED
  } else if (err.name === 'TokenExpiredError') {
    error = { ...error, ...errorMap.default }
    error.message = 'Your token has expired! Please log in again.'
    error.statusCode = httpStatus.UNAUTHORIZED
  } else {
    error = { ...error, ...errorMap.default }
  }

  error = new APIError(error.message, error.status, error.statusCode, error.isOperational)

  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack

    sendErrorDev(error, res)
  } else {
    sendErrorProd(error, res)
  }
}
