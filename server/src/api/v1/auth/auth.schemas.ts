import { z } from 'zod';

const authBase = {
    body: z
        .object({
            name: z.string({
                required_error: 'A user must have a name',
            }),
            email: z
                .string({
                    required_error: 'A user must have an email',
                })
                .email({
                    message: 'Please provide a valid email',
                }),
            password: z
                .string({
                    required_error: 'A user must have a password',
                })
                .min(8, 'Password must be at least 8 characters'),
            passwordConfirm: z.string({
                required_error: 'A user must have a password confirmation',
            }),
        })
        .refine(data => data.password === data.passwordConfirm, {
            message: 'Passwords do not match',
            path: ['passwordConfirm'],
        }),
};

export const signupSchema = z.object({
    ...authBase,
});

export type SignupInput = z.infer<typeof signupSchema>['body'];
