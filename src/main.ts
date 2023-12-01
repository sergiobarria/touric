import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    // ====== App Config ======
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(port);
}
bootstrap();
