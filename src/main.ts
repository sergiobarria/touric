import { createServer } from './server';
import { logger } from './utils/logger';

const signals = ['SIGINT', 'SIGTERM'] as const;

async function gracefulShutdown(app: Awaited<ReturnType<typeof createServer>>) {
    await app.close();
}

async function bootstrap() {
    const app = await createServer();

    logger.debug(app.config);

    await app.listen({ port: app.config.PORT });

    for (const signal of signals) {
        process.on(signal, () => {
            gracefulShutdown(app);
        });
    }
}

void bootstrap();
