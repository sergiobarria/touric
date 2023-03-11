import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'bson'
import ms from 'ms'

import { IUserDocument } from '@/models/user.model'
import { config } from '@/config'
import { APIError } from './apiError'

const { JWT_SECRET, JWT_EXPIRES_IN } = config

export const signToken = (id: string | ObjectId): string => {
  // Convert ObjectId to string
  if (id instanceof ObjectId) {
    id = id.toString()
  }

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })
}

export const createAndSendToken = (user: IUserDocument, statusCode: number, res: Response): void => {
  const token = signToken(user._id)
  const expiresInMilliseconds = ms(JWT_EXPIRES_IN)
  let expirationDate: Date

  if (typeof expiresInMilliseconds === 'number') {
    expirationDate = new Date(Date.now() + expiresInMilliseconds)
  } else {
    throw APIError.internal(`Invalid expiration format: ${JWT_EXPIRES_IN}`)
  }

  res.cookie('jwt', token, {
    expires: expirationDate, // Convert days to milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Only send cookie over HTTPS
  })

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}
