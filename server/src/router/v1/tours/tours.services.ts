import type { tours, Prisma } from '@prisma/client'

import { prisma } from '@/lib'
import type { CreateTourType } from './tours.schemas'

export const createOne = async (data: CreateTourType): Promise<tours> => {
    const record = await prisma.tours.create({ data })
    return record
}

export const findMany = async (): Promise<tours[]> => {
    const records = await prisma.tours.findMany()
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
