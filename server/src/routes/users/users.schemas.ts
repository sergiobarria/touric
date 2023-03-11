import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  passwordConfirm: z.string().min(6).optional(),
  photo: z.string().optional(),
  role: z.string().optional()
})

export const updateMeSchema = z.object({
  body: userSchema
})

export type UpdateMeType = z.infer<typeof updateMeSchema>['body']
