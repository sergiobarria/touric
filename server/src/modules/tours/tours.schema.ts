import { z } from 'zod'

const payload = {
  body: z.object({
    name: z.string(),
    duration: z.number(),
    difficulty: z.enum(['easy', 'medium', 'difficult'])
  })
}

const params = {
  params: z.object({
    id: z.string({
      required_error: 'id is required'
    })
  })
}

export const getAllToursSchema = z.object({
  ...payload
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

export type CreateTourInput = z.infer<typeof createTourSchema>
export type GetTourInput = z.infer<typeof getTourSchema>
export type UpdateTourInput = z.infer<typeof updateTourSchema>
export type DeleteTourInput = z.infer<typeof deleteTourSchema>
