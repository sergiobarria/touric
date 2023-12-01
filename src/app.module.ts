import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [HealthModule, ToursModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
