import type { tours, Prisma } from '@prisma/client'
import { cloneDeep } from 'lodash'

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
