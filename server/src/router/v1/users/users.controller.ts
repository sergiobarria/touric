import type { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

/**
 * @desc: Create a new user
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        message: 'route not implemented yet'
    })
})

/**
 * @desc: Get all users from the database
 * @endpoint: GET /api/v1/users
 * @access: Public
 */
export const getUsersHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        message: 'route not implemented yet'
    })
})

/**
 * @desc: Get single user from the database
 * @endpoint: GET /api/v1/users/:id
 * @access: Public
 */
export const getUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        message: 'route not implemented yet'
    })
})

/**
 * @desc: Update a user
 * @endpoint: PATCH /api/v1/users/:id
 * @access: Public
 */
export const updateUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        message: 'route not implemented yet'
    })
})

/**
 * @desc: Delete a user
 * @endpoint: DELETE /api/v1/users/:id
 * @access: Public
 */
export const deleteUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        message: 'route not implemented yet'
    })
})
