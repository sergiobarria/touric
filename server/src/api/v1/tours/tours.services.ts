import { omit } from 'lodash';

import { TourModel, privateFields, type Tour } from '@/models';
import type { CreateTourInput, UpdateTourInput } from './tours.schemas';

export async function createOne(data: CreateTourInput): Promise<Partial<Tour>> {
    const tour = await TourModel.create(data);

    return omit(tour.toJSON(), privateFields);
}

export async function getAll(): Promise<Tour[]> {
    const tours = await TourModel.find().select('-__v');

    return tours;
}

export async function getOne(id: string): Promise<Partial<Tour> | null> {
    const tour = await TourModel.findById(id).select('-__v');

    return tour !== null ? omit(tour.toJSON(), privateFields) : null;
}

export async function updateOne(id: string, data: UpdateTourInput): Promise<Tour | null> {
    const tour = await TourModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).select('-__v');

    return tour;
}

export async function deleteOne(id: string): Promise<Tour | null> {
    const tour = await TourModel.findByIdAndDelete(id);

    return tour;
}
