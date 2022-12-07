import { z } from 'zod'

const payload = {
  body: z.object({
    name: z.string().min(10).max(40).optional(),
    duration: z.number().optional(),
    maxGroupSize: z.number().optional(),
    difficulty: z.enum(['easy', 'medium', 'difficult']).optional(),
    ratingsAverage: z.number().min(1).max(5).optional(),
    ratingQuantity: z.number().positive().optional(),
    price: z.number().positive().optional(),
    priceDiscount: z.number().positive().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    imageCover: z.string().optional(),
    images: z.array(z.string()).optional(),
    startDates: z.array(z.union([z.string(), z.date()])).optional()
  })
}

const params = {
  params: z.object({
    id: z.string({
      required_error: 'id is required'
    }),
    year: z.string().optional()
  })
}

const query = {
  query: z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional(),
    sort: z.string().optional(),
    fields: z.string().optional()
  })
}

export const getAllToursSchema = z.object({
  ...payload,
  ...query
})

export const createTourSchema = z.object({
  ...payload
})

export const getTourSchema = z.object({
  ...params
})

export const updateTourSchema = z.object({
  ...params,
  ...payload
})

export const deleteTourSchema = z.object({
  ...params
})

export type GetAllToursInput = z.infer<typeof getAllToursSchema>
export type CreateTourInput = z.infer<typeof createTourSchema>
export type GetTourInput = z.infer<typeof getTourSchema>
export type UpdateTourInput = z.infer<typeof updateTourSchema>
export type DeleteTourInput = z.infer<typeof deleteTourSchema>
