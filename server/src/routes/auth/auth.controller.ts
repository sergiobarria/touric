import * as crypto from 'crypto'

import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import { UserModel } from '@/models/user.model'
import {
  ForgotPasswordInputType,
  LoginInputType,
  ResetPasswordInputType,
  ResetPasswordParamsType,
  SignupInputType
} from './auth.schemas'
import { APIError } from '@/shared/utils/apiError'
import { signToken } from '@/shared/utils/signToken'
import { config } from '@/config'
import { sendEmail } from '@/shared/utils/emailSender'

const { API_VERSION, HOST } = config

/**
 * @desc: Signup
 * @endpoint: GET /api/v1/auth/signup
 * @access: Public
 */
export const signup = asyncHandler(
  async (req: Request<unknown, unknown, SignupInputType>, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm, role } = req.body
    const newUser = await UserModel.create({ name, email, password, passwordConfirm, role })

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

/**
 * @desc: Login
 * @endpoint: GET /api/v1/auth/login
 * @access: Public
 */
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

/**
 * @desc: Forgot password
 * @endpoint: GET /api/v1/auth/forgot-password
 * @access: Public
 */
export const forgotPassword = asyncHandler(
  async (req: Request<{}, {}, ForgotPasswordInputType>, res: Response, next: NextFunction) => {
    const { email } = req.body

    // 1) Get user based on Posted email
    const user = await UserModel.findOne({ email })

    if (user === null) {
      return next(APIError.notFound('There is no user with email address'))
    }

    // 2) If user exists, generate the random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false }) // We don't want to validate the password and passwordConfirm fields

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host') ?? HOST}/api/${API_VERSION}/auth/reset-password/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

    try {
      await sendEmail({
        to: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      })
    } catch (err) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save({ validateBeforeSave: false })

      return next(APIError.internal('There was an error sending the email. Try again later!'))
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Token sent to email!'
    })
  }
)

/**
 * @desc: Reset password
 * @endpoint: GET /api/v1/auth/forgot-password
 * @access: Public
 */
export const resetPassword = asyncHandler(
  async (req: Request<ResetPasswordParamsType, {}, ResetPasswordInputType>, res: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await UserModel.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })

    // 2) If token has not expired, and there is user, set the new password
    if (user === null) {
      return next(APIError.badRequest('Token is invalid or has expired'))
    }

    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    const token = signToken(user._id)

    res.status(httpStatus.OK).json({
      status: 'success',
      token
    })
  }
)
