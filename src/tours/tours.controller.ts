import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dtos/CreateTourDto';

@Controller({
    path: 'tours',
    version: '1',
})
export class ToursController {
    constructor(private toursService: ToursService) {}

    @Get()
    async getTours(): Promise<Record<string, unknown>> {
        const tours = await this.toursService.getTours();
        return {
            success: true,
            results: tours.length,
            data: { tours },
        };
    }

    @Get(':id')
    async getTour(@Param() params: { id: string }): Promise<Record<string, unknown>> {
        const tour = await this.toursService.getTourByID(params.id);

        return {
            success: true,
            data: { tour },
        };
    }

    @Post()
    async createTour(@Body() tourData: CreateTourDto): Promise<Record<string, unknown>> {
        const tour = await this.toursService.createTour(tourData);
        return {
            success: true,
            data: { tour },
        };
    }

    @Patch(':id')
    updateTour(@Param() params: any): string {
        return 'update a tour ' + params.id;
    }

    @Delete(':id')
    deleteTour(@Param() params: any): string {
        return 'delete a tour ' + params.id;
    }
}
