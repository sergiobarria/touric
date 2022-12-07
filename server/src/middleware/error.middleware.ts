import { Request, Response, NextFunction } from 'express'

import { AppError } from '@/shared/utils/AppError'

const handleCastErrorDB = (err: any): AppError => {
  const message =
    err !== undefined
      ? `Invalid ${err.path as string}: ${err.value as string}`
      : 'Invalid input data'
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = err !== undefined ? err.message?.match(/(["'])(\\?.)*?\1/)[0] : ''
  const message = `Duplicate field value: ${value as string}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = (): AppError => new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErrorDev = (err: any, req: any, res: any): Response<void> => {
  // A) API
  if (req.originalUrl.startsWith('/api') === true) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err)
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  })
}

const sendErrorProd = (err: AppError, req: Request, res: Response): void => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
      return
    }

    // Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err)

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
    return
  }

  // B) RENDERED WEBSITE
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    })
  }

  // Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err)

  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  })
}

// Global error handler
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response
  // next: NextFunction
): void => {
  err.statusCode = err.statusCode !== undefined ? err.statusCode : 500
  err.status = err.status !== '' ? err.status : 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    error.message = err.message

    if (error.name === 'CastError') error = handleCastErrorDB(error)
    if (error.statusCode === 11000) error = handleDuplicateFieldsDB(error)
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError()
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

    sendErrorProd(error, req, res)
  }
}

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`)

  res.status(404)
  next(error)
}
