/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
    }
}
