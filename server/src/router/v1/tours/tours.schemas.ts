import { z } from 'zod'

export const payload = {
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        price: z
            .number({
                required_error: 'Price is required'
            })
            .min(0, 'Price must be greater than 0'),
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
