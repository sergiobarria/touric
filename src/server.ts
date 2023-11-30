import fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { logger } from '@/utils/logger';
import { healthRoutes } from './modules/health/health.routes';
import { toursRoutes } from './modules/tours/tours.routes';
import { usersRoutes } from './modules/users/users.routes';

export function createServer() {
    const app = fastify({ logger }).withTypeProvider<TypeBoxTypeProvider>();

    // ===== Register Plugins 👇 =====

    // ===== Register Routes 👇 =====
    app.register(healthRoutes, { prefix: '/api' });
    app.register(toursRoutes, { prefix: '/api/v1/tours' });
    app.register(usersRoutes, { prefix: '/api/v1/users' });

    return app;
}
