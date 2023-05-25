import express, { type Express } from 'express';
import config from 'config';

import { routerV1 } from './api';
import { morganMiddleware } from './middlewares';
import { envs } from './constants';

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
