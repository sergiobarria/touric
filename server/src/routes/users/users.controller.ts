import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'

import { UpdateMeType } from './users.schemas'
import { UserModel } from '@/models/user.model'
import { AuthenticatedRequest } from '@/middleware/protectRoute.middleware'
import { APIError } from '@/shared/utils/apiError'
import { filterObj } from '@/shared/utils/helpers'

/**
 * @desc: Get all users
 * @endpoint: GET /api/v1/users
 * @access: Public
 */
export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserModel.find()

  res.status(httpStatus.OK).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
})

/**
 * @desc: Get user
 * @endpoint: GET /api/v1/users/:id
 * @access: Public
 */
export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({ status: 'fail route not implemented', message: 'getUser' })
})

/**
 * @desc: Create user
 * @endpoint: POST /api/v1/users
 * @access: Public
 */
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.CREATED).json({ status: 'fail route not implemented', message: 'createUser' })
})

/**
 * @desc: Update user
 * @endpoint: PATCH /api/v1/users/:id
 * @access: Public
 */
export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({ status: 'fail route not implemented', message: 'updateUser' })
})

/**
 * @desc: Delete
 * @endpoint: DELETE /api/v1/users/:id
 * @access: Public
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({ status: 'fail route not implemented', message: 'deleteUser' })
})

/**
 * @desc: Update me
 * @endpoint: DELETE /api/v1/users/update-me
 * @access: Private
 */
export const updateMe = asyncHandler(
  async (req: AuthenticatedRequest<UpdateMeType>, res: Response, next: NextFunction) => {
    // 1) Create error if body contains password or passwordConfirm
    if (req.body.password !== undefined || req.body.passwordConfirm !== undefined) {
      return next(APIError.badRequest('This route is not for password updates. Please use /update-my-password.'))
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email')

    // 3) Update user document
    const updatedUser = await UserModel.findByIdAndUpdate(req.user?.id, filteredBody, {
      new: true,
      runValidators: true
    })

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    })
  }
)
