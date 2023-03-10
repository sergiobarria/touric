import { promisify } from 'util'

import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { APIError } from '@/shared/utils/apiError'
import { UserModel } from '@/models/user.model'

interface DecodedToken {
  id: string
  iat: number
  exp: number
}

export interface User {
  id?: string
  role: string
  name: string
  email: string
}

// NOTE: use this interface to extend the Request interface in the routes
// that require authentication, add the current user to the request object
export interface AuthenticatedRequest<B> extends Request {
  user?: User
  body: B
}

const JWT_SECRET = process.env.JWT_SECRET as string

const verifyToken = promisify(jwt.verify)

/**
 * @desc: Protect routes from unauthenticated users
 * @endpoint: N/A (middleware)
 */
export const protectRoute = asyncHandler(
  async (req: AuthenticatedRequest<unknown>, res: Response, next: NextFunction) => {
    let token: string | undefined

    // 1. Get token and check if it's there
    if (req?.headers?.authorization?.startsWith('Bearer') === true) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (token === undefined) {
      return next(APIError.unauthorized('You are not logged in! Please log in to get access.'))
    }

    // 2. Verification token
    // @ts-expect-error - This works, but TS doesn't like it, maybe an issue with jwt.verify types
    const decoded: DecodedToken = await verifyToken(token, JWT_SECRET)

    // 3. Check if user still exists
    const currUser = await UserModel.findById(decoded?.id)

    if (currUser === null) {
      return next(APIError.unauthorized('The user belonging to this token does no longer exist.'))
    }

    // 4. Check if user changed password after the token was issued
    if (currUser.changedPasswordAfter(decoded.iat)) {
      return next(APIError.unauthorized('User recently changed password! Please log in again.'))
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currUser
    next()
  }
)
