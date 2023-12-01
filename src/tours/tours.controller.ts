import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { ToursService } from './tours.service';

@Controller({
    path: 'tours',
    version: '1',
})
export class ToursController {
    constructor(private toursService: ToursService) {}

    @Get()
    getTours(): any {
        return this.toursService.getTours();
    }

    @Get(':id')
    getTour(@Param() params: any): string {
        return 'get a single tour' + params.id;
    }

    @Post()
    createTour(): string {
        return 'create a new tour';
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
