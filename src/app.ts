import fastify, { type FastifyInstance } from 'fastify';

import { logger } from './utils/logger';
import { tourRoutes } from './modules/tours/tours.routes';
import { userRoutes } from './modules/users/users.routes';

export function createApp(): FastifyInstance {
    const app = fastify({ logger });

    // ===== Register Plugins 👇 =====

    // ===== Register Routes 👇 =====
    app.register(tourRoutes, { prefix: '/api/v1/tours' });
    app.register(userRoutes, { prefix: '/api/v1/users' });

    return app;
}
