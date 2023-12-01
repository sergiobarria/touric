import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { HealthModule } from './health/health.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';

const envVarsSchema = Joi.object({
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    DATABASE_CONNECTION: Joi.string().required(),
});

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env', // default
            isGlobal: true,
            validationSchema: envVarsSchema,
        }),
        HealthModule,
        ToursModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
