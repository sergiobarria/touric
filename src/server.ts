import { createApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const signals = ['SIGINT', 'SIGTERM'] as const;

async function gracefulShutdown(app: Awaited<ReturnType<typeof createApp>>): Promise<void> {
    await app.close();
}

async function main(): Promise<void> {
    const app = createApp();

    logger.debug(env);

    try {
        await app.listen({ port: env.PORT, host: env.HOST });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }

    for (const signal of signals) {
        process.on(signal, () => {
            gracefulShutdown(app);
        });
    }
}

void main();
