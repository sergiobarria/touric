import express, { type Express } from 'express';
import config from 'config';

import { envs } from './constants';
import { morganMiddleware } from './middlewares';

export const app: Express = express();

const env = config.get<string>('NODE_ENV');

// ===== Register Middleware 👇🏼 =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env === envs.DEVELOPMENT) {
    app.use(morganMiddleware);
}

// ===== Register Routes 👇🏼 =====
