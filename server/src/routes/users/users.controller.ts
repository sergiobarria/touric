import { UserModel } from '@/models/user.model'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'

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
