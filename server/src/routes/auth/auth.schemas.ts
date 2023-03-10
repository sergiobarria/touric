import { z } from 'zod'

export const userSchema = z
  .object({
    name: z.string({
      required_error: 'Please tell us your name!'
    }),
    email: z
      .string({
        required_error: 'Please provide your email'
      })
      .email(),
    photo: z.string().optional(),
    password: z.string({
      required_error: 'Please provide a password'
    }),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password'
    })
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Passwords are not the same!',
    path: ['passwordConfirm']
  })

export const signupSchema = z.object({
  body: userSchema
})

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Please provide your email'
      })
      .email(),
    password: z.string({
      required_error: 'Please provide your password'
    })
  })
})

export type UserType = z.infer<typeof userSchema>
export type SignupInputType = z.infer<typeof signupSchema>['body']
export type LoginInputType = z.infer<typeof loginSchema>['body']
