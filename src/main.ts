import { createServer } from './server';

const PORT = 3000;

async function bootstrap() {
    const app = await createServer();

    await app.listen({ port: PORT });
}

void bootstrap();
