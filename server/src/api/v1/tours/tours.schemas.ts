import { z } from 'zod';

const tourBase = {
    body: z.object({
        name: z.string({
            required_error: 'A tour must have a name',
        }),
        duration: z
            .number({
                required_error: 'A tour must have a duration',
            })
            .min(1),
        maxGroupSize: z
            .number({
                required_error: 'A tour must have a max group size',
            })
            .min(1),
        difficulty: z.enum(['easy', 'medium', 'difficult']),
        ratingsAverage: z.number().min(1).max(5).default(4.5),
        ratingsQuantity: z.number().min(0).default(0),
        price: z
            .number({
                required_error: 'A tour must have a price',
            })
            .min(1),
        priceDiscount: z.number().min(1).optional(),
        summary: z.string({
            required_error: 'A tour must have a summary',
        }),
        description: z.string().optional(),
        imageCover: z.string({
            required_error: 'A tour must have a cover image',
        }),
        images: z.array(z.string()).optional(),
        startDates: z.array(z.string()).optional(),
    }),
};

const tourParams = {
    params: z.object({
        id: z.string({
            required_error: 'Resource ID is required',
        }),
    }),
};

export const createTourSchema = z.object({
    ...tourBase,
});

export const getTourSchema = z.object({
    ...tourParams,
});

export const updateTourSchema = z.object({
    ...tourParams,
    body: z.object({
        name: z.string().optional(),
        duration: z.number().min(1).optional(),
        maxGroupSize: z.number().min(1).optional(),
        difficulty: z.enum(['easy', 'medium', 'difficult']).optional(),
        ratingsAverage: z.number().min(1).max(5).optional(),
        ratingsQuantity: z.number().min(0).optional(),
        price: z.number().min(1).optional(),
        priceDiscount: z.number().min(1).optional(),
        summary: z.string().optional(),
        description: z.string().optional(),
        imageCover: z.string().optional(),
        images: z.array(z.string()).optional(),
        startDates: z.array(z.date()).optional(),
    }),
});

export type CreateTourInput = z.infer<typeof createTourSchema>['body'];
export type GetTourInput = z.infer<typeof getTourSchema>['params'];
export type UpdateTourInput = z.infer<typeof updateTourSchema>['body'];
