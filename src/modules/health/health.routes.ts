import type { FastifyInstance } from 'fastify';
import status from 'http-status';

export async function healthRoutes(app: FastifyInstance) {
    app.get('/health', {}, async (request, reply) => {
        return reply.code(status.OK).send({
            status: 'OK',
            code: status.OK,
            message: 'Server is running!',
            details: {
                name: 'Touric Server API',
                version: '1.0.0',
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                timestamp: Date.now()
            }
        });
    });
}
