import fastify from 'fastify';

import { logger } from './utils/logger';

export function createServer() {
    const app = fastify({ logger });

    app.get('/', async (request, reply) => {
        return { hello: 'world' };
    });

    return app;
}
