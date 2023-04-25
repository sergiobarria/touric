import type { Prisma } from '@prisma/client'
import slugify from 'slugify'

// This file includes all the middleware functions applied to the prisma client
type PrismaNextFunc = (params: Prisma.MiddlewareParams) => Promise<Prisma.MiddlewareParams>

export async function toursMiddleware(
    params: Prisma.MiddlewareParams,
    next: PrismaNextFunc
): Promise<Prisma.MiddlewareParams> {
    const collection = 'tours'

    // Actions BEFORE creating a new tour 👇🏼
    if (params.model === collection && params.action === 'create') {
        // Add a slug to the tour
        params.args.data.slug = slugify(params.args.data.name, { lower: true })
    }

    const result = await next(params)

    // Actions AFTER creating a new bootcamp 👇🏼
    if (params.model === collection && params.action === 'create') {
        // Do something with the result
    }

    if (params.model === collection && (params.action === 'findMany' || params.action === 'findUnique')) {
        // add the duration in weeks for each tour
    }

    return result
}
