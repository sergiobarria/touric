import fastify from 'fastify';
import { Type, type Static } from '@sinclair/typebox';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyEnv, { type FastifyEnvOptions } from '@fastify/env';

import { logger } from '@/utils/logger';
import { healthRoutes } from './modules/health/health.routes';
import { toursRoutes } from './modules/tours/tours.routes';
import { usersRoutes } from './modules/users/users.routes';

const schema = Type.Object({
    PORT: Type.Number({ default: 3000 }),
    NODE_ENV: Type.String({ default: 'development' }),
    DATABASE_CONNECTION: Type.String()
});

export type Config = Static<typeof schema>;

const options = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env
} satisfies FastifyEnvOptions;

export async function createServer() {
    const app = fastify({ logger }).withTypeProvider<TypeBoxTypeProvider>();

    // ===== Register Plugins 👇 =====
    await app.register(fastifyEnv, options);

    // ===== Register Routes 👇 =====
    app.register(healthRoutes, { prefix: '/api' });
    app.register(toursRoutes, { prefix: '/api/v1/tours' });
    app.register(usersRoutes, { prefix: '/api/v1/users' });

    return app;
}
