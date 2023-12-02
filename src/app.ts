import fastify, { type FastifyInstance } from 'fastify';

import { logger } from './utils/logger';
import { tourRoutes } from './modules/tours/tours.routes';

export function createApp(): FastifyInstance {
    const app = fastify({ logger });

    // ===== Register Plugins 👇 =====

    // ===== Register Routes 👇 =====
    app.register(tourRoutes, { prefix: '/api/v1/tours' });

    return app;
}
