import type { Request, Response, NextFunction } from 'express';
import { type AnyZodObject, ZodError } from 'zod';
import httpStatus from 'http-status';
import { pick } from 'lodash';

export const validate = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });

            // sanitize the request body from unwanted fields
            if (req.body !== undefined && data.body !== undefined) {
                req.body = pick(req.body, Object.keys(data.body));
            }

            next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: 'fail',
                    message: 'Invalid request data',
                    errors: error.flatten()
                });
            }

            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message,
                errors: error
            });
        }
    };
};
