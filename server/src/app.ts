import express from 'express';

import { morganMiddleware, globalErrorHandler, notFound } from './middleware';

import { router } from './routes';

const app = express();

// Apply middlewares
app.use(express.json());
app.use(morganMiddleware);

// Apply routes
app.use('/api/v1', router);

// Not found route
app.use(notFound);

// Error Handling Middleware
app.use(globalErrorHandler);

export { app };
