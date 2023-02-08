import express from 'express';

import { morganMiddleware } from './middleware/morgan.middleware';

import { router } from './routes';

const app = express();

// Apply middlewares
app.use(express.json());
app.use(morganMiddleware);

// Apply routes
app.use('/api/v1', router);

export { app };
