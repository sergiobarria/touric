import fastify, { type FastifyInstance } from 'fastify';

import { logger } from './utils/logger';

export function createApp(): FastifyInstance {
    const app = fastify({ logger });

    return app;
}
