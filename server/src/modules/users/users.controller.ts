import { Request, Response } from 'express'
import httpStatus from 'http-status'

import {
  CreateUserInput,
  GetUserInput,
  UpdateUserInput,
  DeleteUserInput
} from '@/modules/users/users.schema'

/**
 * @description - Get All Users
 * @access - Public
 * @routes - GET /api/v1/users
 */
export const getAllUsers = (req: Request, res: Response): Response => {
  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {}
  })
}

/**
 * @description - Create User
 * @access - Public
 * @routes - Post /api/v1/users
 */
export const createUser = (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
): Response => {
  return res.status(httpStatus.CREATED).json({
    status: 'success',
    data: {}
  })
}

/**
 * @description - Get a single user from the users collection
 * @access - Public
 * @routes - GET /api/v1/users/:id
 */
export const getUser = (req: Request<GetUserInput['params']>, res: Response): Response => {
  // const { id } = req.params

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      user: '<User with id>'
    }
  })
}

/**
 * @description - Update a user from the users collection
 * @access - Public
 * @routes - PATCH /api/v1/users/:id
 */
export const updateUser = (
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response
): Response => {
  // const { id } = req.params

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      user: '<Updated user with id>'
    }
  })
}

/**
 * @description - Delete a user from the users collection
 * @access - Public
 * @routes - DELETE /api/v1/users/:id
 */
export const deleteUser = (req: Request<DeleteUserInput['params']>, res: Response): Response => {
  // const { id } = req.params

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      user: '<Deleted user with id>'
    }
  })
}
