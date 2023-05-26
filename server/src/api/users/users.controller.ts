import type { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};

export const createUser: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};
