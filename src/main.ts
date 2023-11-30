import { createServer } from './server';

const PORT = 3000;
const signals = ['SIGINT', 'SIGTERM'] as const;

async function gracefulShutdown(app: Awaited<ReturnType<typeof createServer>>) {
    await app.close();
}

async function bootstrap() {
    const app = await createServer();

    await app.listen({ port: PORT });

    for (const signal of signals) {
        process.on(signal, () => {
            gracefulShutdown(app);
        });
    }
}

void bootstrap();
