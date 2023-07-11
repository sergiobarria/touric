import type { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

/**
 * @desc   Create a new user
 * @route  POST /api/v1/users
 * @access Public
 */
export const createUserHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};

/**
 * @desc   Get all users
 * @route  GET /api/v1/users
 * @access Public
 */
export const getUsersHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};

/**
 * @desc   Get a user
 * @route  GET /api/v1/users/:id
 * @access Public
 */
export const getUserHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};

/**
 * @desc   Update a user
 * @route  PATCH /api/v1/users/:id
 * @access Public
 */
export const updateUserHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};

/**
 * @desc   Delete a user
 * @route  DELETE /api/v1/users/:id
 * @access Public
 */
export const deleteUserHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};
