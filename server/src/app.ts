import express, { type Express, type Request, type Response } from 'express';
import httpStatus from 'http-status';
import config from 'config';

import { envs } from './constants';
import { morganMiddleware } from './middlewares';
import { routerV1 } from './api/v1/router';

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

app.use('/endpoints', (_: Request, res: Response): void => {});

// ===== Register Error Handlers 👇🏼 =====

// ===== Register Not Found Handler 👇🏼 =====
