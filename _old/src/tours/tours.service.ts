import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Tour, Prisma } from '@prisma/client';

@Injectable()
export class ToursService {
    private readonly tours = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../../data/tours-simple.json'), 'utf-8'),
    );

    constructor(private prisma: PrismaService) {}

    async createTour(data: Prisma.TourCreateInput): Promise<Tour> {
        return this.prisma.tour.create({ data });
    }

    async getTours() {
        return await this.prisma.tour.findMany();
    }

    getTourByID(id: string) {
        const tour = this.prisma.tour.findFirst({ where: { id } });
        if (!tour) throw new Error('Tour not found');

        return tour;
    }

    updateTour() {
        return {
            success: true,
            data: { tour: 'update a tour' },
        };
    }

    deleteTour() {
        return {
            success: true,
            data: null,
        };
    }
}
