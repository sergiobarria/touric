import { z } from 'zod';

const payload = {
    body: z.object({
        name: z
            .string({
                required_error: 'A tour must have a name'
            })
            .min(3)
            .max(255),
        price: z
            .number({
                required_error: 'A tour must have a price'
            })
            .min(0)
    })
};

const params = {
    params: z.object({
        id: z.string()
    })
};

export const createTourSchema = z.object({ ...payload });

export const getTourSchema = z.object({ ...params });

export const updateTourSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(255).optional(),
        price: z.number().min(0).optional()
    }),
    ...params
});

export type CreateTourInput = z.infer<typeof createTourSchema>['body'];
export type GetTourType = z.infer<typeof getTourSchema>['params'];
export type UpdateTourInput = z.infer<typeof updateTourSchema>['body'];
export type UpdateTourParams = z.infer<typeof updateTourSchema>['params'];
