import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'bson'

import { IUserDocument } from '@/models/user.model'
import { config } from '@/config'

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

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}
