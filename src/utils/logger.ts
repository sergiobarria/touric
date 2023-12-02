import type { FastifyBaseLogger } from 'fastify';
import pino from 'pino';

export const logger: FastifyBaseLogger = pino({
    redact: ['DATABASE_CONNECTION'],
    level: 'debug',
    transport: {
        target: 'pino-pretty',
    },
});
