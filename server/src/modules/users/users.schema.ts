import { z } from 'zod'

const payload = {
  body: z.object({})
}

const params = {
  params: z.object({
    id: z.string({
      required_error: 'id is required'
    })
  })
}

export const getAllUsersSchema = z.object({})

export const createUserSchema = z.object({
  ...payload
})

export const getUserSchema = z.object({
  ...params
})

export const updateUserSchema = z.object({
  ...params,
  ...payload
})

export const deleteUserSchema = z.object({
  ...params
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type GetUserInput = z.infer<typeof getUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type DeleteUserInput = z.infer<typeof deleteUserSchema>
