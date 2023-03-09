import { z } from 'zod'

export const tourSchema = z.object({
  name: z
    .string({
      required_error: 'A tour must have a name'
    })
    .min(10, {
      message: 'A tour name must have more or equal then 10 characters'
    })
    .max(40, {
      message: 'A tour name must have less or equal then 40 characters'
    }),
  duration: z.number(),
  maxGroupSize: z.number(),
  difficulty: z.enum(['easy', 'medium', 'difficult']),
  ratingsAverage: z.number().min(1).max(5),
  ratingsQuantity: z.number(),
  price: z.number(),
  summary: z.string(),
  description: z.string(),
  imageCover: z.string(),
  images: z.array(z.string()),
  startDates: z.array(z.string())
})

export const createTourSchema = z.object({
  body: tourSchema
})

export const getToursSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    fields: z.string().optional()
  })
})

export const getTourSchema = z.object({
  params: z.object({
    id: z.string()
  })
})

export const updateTourSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: tourSchema
})

export const deleteTourSchema = z.object({
  params: z.object({
    id: z.string()
  })
})

export type TourType = z.infer<typeof tourSchema>
export type CreateTourInputType = z.infer<typeof createTourSchema>['body']
export type GetToursQueryType = z.infer<typeof getToursSchema>['query']
export type GetTourParamsType = z.infer<typeof getTourSchema>['params']
export type UpdateTourBodyType = z.infer<typeof updateTourSchema>['body']
export type UpdateTourParamsType = z.infer<typeof updateTourSchema>['params']
export type DeleteTourParamsType = z.infer<typeof deleteTourSchema>['params']
