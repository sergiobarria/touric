import pino from 'pino';

export const logger = pino({
    level: 'debug',
    redact: ['DATABASE_CONNECTION'],
    transport: {
        target: 'pino-pretty'
    }
});
