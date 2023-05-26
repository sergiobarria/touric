import { omit } from 'lodash';

import { Tour, privateFields, type TourDocument } from '@/models';
import type { CreateTourInput, UpdateTourInput } from '@/api/tours/tours.schemas';

export async function createOne(data: CreateTourInput): Promise<Partial<TourDocument> | undefined> {
    const tour = await Tour.create(data);

    return omit(tour.toJSON(), privateFields);
}

export async function getAll(): Promise<TourDocument[]> {
    const tours = await Tour.find();

    return tours;
}

export async function getOne(id: string): Promise<TourDocument | null> {
    const tour = await Tour.findById(id);

    return tour;
}

export async function updateOne(id: string, data: UpdateTourInput): Promise<TourDocument> {
    const tour = await Tour.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

    if (tour === null) {
        throw new Error('tour not found');
    }

    return tour;
}

export async function deleteOne(id: string): Promise<void> {
    await Tour.findByIdAndDelete(id);
}
