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
    role: z.enum(['user', 'guide', 'lead-guide', 'admin']).optional().default('user'),
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

export const validatedUserSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'guide', 'lead-guide', 'admin'])
  })
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

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Please provide your email'
      })
      .email()
  })
})

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Please provide a password'
    }),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password'
    })
  }),
  params: z.object({
    token: z.string()
  })
})

export const updatePasswordSchema = z.object({
  body: z.object({
    passwordCurrent: z.string({
      required_error: 'Please provide your current password'
    }),
    password: z.string({
      required_error: 'Please provide a password'
    }),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password'
    })
  })
})

export type ValidatedUserType = z.infer<typeof validatedUserSchema>['user']
export type UserType = z.infer<typeof userSchema>
export type SignupInputType = z.infer<typeof signupSchema>['body']
export type LoginInputType = z.infer<typeof loginSchema>['body']
export type ForgotPasswordInputType = z.infer<typeof forgotPasswordSchema>['body']
export type ResetPasswordInputType = z.infer<typeof resetPasswordSchema>['body']
export type ResetPasswordParamsType = z.infer<typeof resetPasswordSchema>['params']
export type UpdatePasswordInputType = z.infer<typeof updatePasswordSchema>['body']
