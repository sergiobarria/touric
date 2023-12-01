import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ToursService {
    private readonly tours = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../../data/tours-simple.json'), 'utf-8'),
    );

    createTour() {
        return {
            success: true,
            data: { tour: 'create a new tour' },
        };
    }

    getTours() {
        return {
            success: true,
            results: this.tours.length,
            data: { tours: this.tours },
        };
    }

    getTourByID(id: string | number) {
        const tour = this.tours.find(tour => tour.id === +id);

        return {
            success: true,
            data: { tour },
        };
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
