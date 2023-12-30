import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    healthCheck(): Record<string, any> {
        return {
            status: 'ok',
            code: 200,
            message: 'service is up and running',
            details: {
                name: 'Touric Server API',
                version: '1.0.0',
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                timestamp: Date.now(),
            },
        };
    }
}
