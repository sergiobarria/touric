import type { tours, Prisma } from '@prisma/client'
import { cloneDeep, round } from 'lodash'

import { prisma } from '@/lib'
import type { CreateTourType } from './tours.schemas'
import { QueryBuilder } from '@/utils'

const numberFields = ['duration', 'price', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'priceDiscount']

export const createOne = async (data: CreateTourType): Promise<tours> => {
    const record = await prisma.tours.create({ data })
    return record
}

export const findMany = async (query?: Record<string, any>): Promise<object[]> => {
    const queryObj: Record<string, any> = cloneDeep(query) as Record<string, any> // creates a deep copy of the query object
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    const queryBuilder = new QueryBuilder(queryObj, { numberFields, excludedFields })

    const records: object[] = await prisma.tours.findMany({
        where: queryBuilder.where(),
        orderBy: queryBuilder.orderBy(),
        select: queryBuilder.select(),
        skip: queryBuilder.paginate().skip,
        take: queryBuilder.paginate().take
    })

    // add the duration in weeks for each tour
    records.forEach((record: any) => {
        record.durationWeeks = round(record.duration / 7, 2)
    })

    return records
}

export const findById = async (id: string): Promise<tours | null> => {
    const record = await prisma.tours.findUnique({ where: { id } })
    return record
}

export const findOne = async (where: Prisma.toursWhereInput): Promise<tours | null> => {
    const record = await prisma.tours.findFirst({ where })
    return record
}

export const updateOne = async (id: string, data: Prisma.toursUpdateInput): Promise<tours | null> => {
    const record = await prisma.tours.update({ where: { id }, data })
    return record
}

export const deleteOne = async (id: string): Promise<tours | null> => {
    const record = await prisma.tours.delete({ where: { id } })
    return record
}

export const getTopFive = async (): Promise<tours[]> => {
    const records = await prisma.tours.findMany()
    return records
}

export const getTourStats = async (): Promise<Prisma.JsonObject> => {
    const stats = await prisma.tours.aggregateRaw({
        pipeline: [
            {
                $match: {
                    ratingsAverage: {
                        $gte: 4.5
                    }
                }
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
            //     $match: { _id: { $ne: 'easy' } }
            // }
        ]
    })

    return stats
}

export const getMonthlyPlan = async (year: number): Promise<any> => {
    const plan = await prisma.tours.aggregateRaw({
        pipeline: [
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                } as any
            },
            {
                $addFields: {
                    startDates: {
                        $cond: {
                            if: { $eq: [{ $type: '$startDates' }, 'string'] },
                            then: { $toDate: '$startDates' },
                            else: '$startDates'
                        }
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
        ]
    })

    return plan
}
