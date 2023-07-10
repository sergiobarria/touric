import type { Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * @desc   Create a new user
 * @route  POST /api/v1/users
 * @access Public
 */
export async function createUserHandler(req: Request, res: Response): Promise<Response> {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
}

/**
 * @desc   Get all users
 * @route  GET /api/v1/users
 * @access Public
 */
export async function getUsersHandler(req: Request, res: Response): Promise<Response> {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
}

/**
 * @desc   Get a user
 * @route  GET /api/v1/users/:id
 * @access Public
 */
export async function getUserHandler(req: Request, res: Response): Promise<Response> {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
}

/**
 * @desc   Update a user
 * @route  PATCH /api/v1/users/:id
 * @access Public
 */
export async function updateUserHandler(req: Request, res: Response): Promise<Response> {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
}

/**
 * @desc   Delete a user
 * @route  DELETE /api/v1/users/:id
 * @access Public
 */
export async function deleteUserHandler(req: Request, res: Response): Promise<Response> {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
}
