import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import { UserModel } from '@/models/user.model'
import { LoginInputType, SignupInputType } from './auth.schemas'
import { APIError } from '@/shared/utils/apiError'
import { signToken } from '@/shared/utils/signToken'

export const signup = asyncHandler(
  async (req: Request<unknown, unknown, SignupInputType>, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body
    const newUser = await UserModel.create({ name, email, password, passwordConfirm })

    const token = signToken(newUser._id)

    res.status(httpStatus.CREATED).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    })
  }
)

export const login = asyncHandler(
  async (req: Request<unknown, unknown, LoginInputType>, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (email === undefined || password === undefined) {
      return next(APIError.badRequest('Please provide email and password!'))
    }

    // 2) Check if user exists && password is correct
    const user = await UserModel.findOne({ email }).select('+password')

    if (user === null || !(await user?.comparePasswords(password, user?.password))) {
      return next(APIError.unauthorized('Incorrect email or password'))
    }

    // 3) If everything ok, send token to client
    // At this point, we know that the user exists and the password is correct
    const token = signToken(user._id)

    res.status(httpStatus.OK).json({
      status: 'success',
      token
    })
  }
)
