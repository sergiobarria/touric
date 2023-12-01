import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
    controllers: [ToursController],
    providers: [ToursService],
    imports: [PrismaModule],
})
export class ToursModule {}
