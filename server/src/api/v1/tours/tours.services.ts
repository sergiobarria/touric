import { omit } from 'lodash';

import { TourModel, privateFields, type Tour } from '@/models';
import type { CreateTourInput, UpdateTourInput } from './tours.schemas';
import { APIQueryFeatures } from '@/utils';

export async function createOne(data: CreateTourInput): Promise<Partial<Tour>> {
    const tour = await TourModel.create(data);

    return omit(tour.toJSON(), privateFields);
}

export async function getAll(reqQuery: Record<string, any> = {}): Promise<Tour[]> {
    const features = new APIQueryFeatures<Tour>(TourModel.find(), reqQuery).filter().limitFields().sort().paginate();
    const tours = await features.query;

    return tours;
}

export async function getOne(id: string): Promise<Partial<Tour> | null> {
    const tour = await TourModel.findById(id);

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

export async function getToursStats(): Promise<Tour[]> {
    const stats: Tour[] = await TourModel.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            },
        },
        {
            $sort: { avgPrice: 1 },
        },
        // {
        //     $match: { _id: { $ne: 'EASY' } },
        // },
    ]);

    return stats;
}

export async function getMonthlyPlan(year: number): Promise<Tour[]> {
    const plan: Tour[] = await TourModel.aggregate([
        {
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' },
            },
        },
        {
            $addFields: { month: '$_id' },
        },
        {
            $project: { _id: 0 },
        },
        {
            $sort: { numTourStarts: -1 },
        },
        {
            $limit: 12,
        },
    ]);

    return plan;
}
