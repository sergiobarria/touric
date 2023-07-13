import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import * as services from './auth.services';
import type { SignupInput } from './auth.schemas';

/**
 * @desc   Register a new user
 * @route  GET /api/v1/auth/signup
 * @access Public
 */
export const signupHandler = async (
    req: Request<unknown, unknown, SignupInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const user = await services.signup(req.body);

    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        data: { user },
    });
};
