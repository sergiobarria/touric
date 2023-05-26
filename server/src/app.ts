import express, { type NextFunction, type Express, type Response, type Request } from 'express';
import config from 'config';

import { routerV1 } from './api';
import { morganMiddleware, globalErrorMiddleware } from './middlewares';
import { envs } from './constants';
import { APIError } from './lib';

export const app: Express = express();

const env = config.get<string>('NODE_ENV');

// ===== Register Middleware 👇🏼 =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env === envs.development) {
    app.use(morganMiddleware);
}

// ===== Register Routes 👇🏼 =====
app.use('/api/v1', routerV1);

// Not found route handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(APIError.notFound(`Can't find ${req.originalUrl} on this server!`));
});

// ===== Register Global Error Middleware Handler 👇🏼 =====
app.use(globalErrorMiddleware);
