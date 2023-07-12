import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import httpStatus from 'http-status';
import config from 'config';
import 'express-async-errors';

import { envs } from './constants';
import { morganMiddleware, globalErrorHandler } from './middlewares';
import { routerV1 } from './api/v1/router';
import { APIError } from './utils/apiError';

export const app: Express = express();

const env = config.get<string>('NODE_ENV');

// ===== Register Middleware 👇🏼 =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env === envs.DEVELOPMENT) {
    app.use(morganMiddleware);
}

// ===== Register Routes 👇🏼 =====
app.use('/healthcheck', (_: Request, res: Response): void => {
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'server is running',
        details: {
            name: 'Touric Server API',
            version: '1.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: Date.now(),
        },
    });
});

app.use('/api/v1', routerV1);

// ===== Register Not Found Handler 👇🏼 =====
app.all('*', (req: Request, res: Response, next: NextFunction): void => {
    next(APIError.notFound(`Can't find ${req.originalUrl} on this server!`));
});

// ===== Register Error Handlers 👇🏼 =====
app.use(globalErrorHandler);
