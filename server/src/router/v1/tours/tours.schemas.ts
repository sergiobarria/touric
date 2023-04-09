import { z } from 'zod'

export const payload = {
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        duration: z.number({
            required_error: 'Duration is required'
        }),
        maxGroupSize: z.number({
            required_error: 'Max group size is required'
        }),
        difficulty: z.enum(['easy', 'medium', 'difficult'], {
            required_error: 'Difficulty is required'
        }),
        ratingsAverage: z.number().min(1).max(5).optional().default(4.5),
        ratingsQuantity: z.number().optional().default(0),
        price: z
            .number({
                required_error: 'Price is required'
            })
            .min(0, 'Price must be greater than 0'),
        priceDiscount: z.number().optional(),
        summary: z.string({
            required_error: 'Summary is required'
        }),
        description: z.string({
            required_error: 'Description is required'
        }),
        imageCover: z.string({
            required_error: 'Image cover is required'
        }),
        images: z.array(z.string()).optional(),
        startDates: z.array(z.string()).optional(),
        rating: z.number().min(1).max(5).default(4.5)
    })
}

export const params = {
    params: z.object({
        id: z.string({
            required_error: 'Id is required'
        })
    })
}

export const createTourSchema = z.object({ ...payload })

export const getTourSchema = z.object({ ...params })

export const updateTourSchema = createTourSchema.deepPartial()

export type CreateTourType = z.infer<typeof createTourSchema>['body']
export type GetTourParams = z.infer<typeof getTourSchema>['params']
