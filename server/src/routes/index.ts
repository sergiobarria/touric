import express, { type Request, type Response } from 'express';
import httpStatus from 'http-status';

import { toursRouter } from './tours.routes';
import { usersRouter } from './users.routes';

export const routerV1 = express();

/**
 * @desc: Healthcheck endpoint
 * @endpoint: /api/v1/healthcheck
 */
routerV1.get('/healthcheck', (_: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'server is running',
        details: {
            name: 'Touric Server API',
            version: '1.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage()
        }
    });
});

// ===== Register Other routes here 👇🏼 =====
routerV1.use('/tours', toursRouter);
routerV1.use('/users', usersRouter);
