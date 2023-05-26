import { omit } from 'lodash';
import type { FilterQuery } from 'mongoose';

import { Tour, privateFields, type TourDocument } from '@/models';
import type { CreateTourInput, UpdateTourInput } from '@/api/tours/tours.schemas';
import { APIFilterFeatures } from '@/utils';

export async function createOne(data: CreateTourInput): Promise<Partial<TourDocument> | undefined> {
    const tour = await Tour.create(data);

    return omit(tour.toJSON(), privateFields);
}

export async function getAll(reqQuery: FilterQuery<TourDocument>): Promise<TourDocument[]> {
    // BUILD & EXECUTE QUERY
    const features = new APIFilterFeatures<TourDocument>(Tour.find(), reqQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;

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

export async function getTourStats(): Promise<TourDocument[]> {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgPrice: 1 }
        }
        // {
        //     $match: { _id: { $ne: 'EASY' } }
        // }
    ]);

    return stats;
}

export async function getMonthlyPlan(year: number): Promise<TourDocument[]> {
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numTourStarts: -1 }
        },
        {
            $limit: 12
        }
    ]);

    return plan;
}
