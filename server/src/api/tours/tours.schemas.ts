import { z } from 'zod';

const payload = {
    body: z
        .object({
            name: z
                .string({
                    required_error: 'A tour must have a name'
                })
                .min(10)
                .max(40),
            duration: z.number({
                required_error: 'A tour must have a duration'
            }),
            maxGroupSize: z.number({
                required_error: 'A tour must have a group size'
            }),
            difficulty: z.enum(['easy', 'medium', 'difficult'], {
                required_error: 'A tour must have a difficulty'
            }),
            ratingsAverage: z.number({
                required_error: 'A tour must have a ratings average'
            }),
            ratingsQuantity: z.number({
                required_error: 'A tour must have a ratings quantity'
            }),
            price: z.number({
                required_error: 'A tour must have a price'
            }),
            priceDiscount: z.number().min(0).optional(),
            summary: z.string({
                required_error: 'A tour must have a summary'
            }),
            description: z.string({
                required_error: 'A tour must have a description'
            }),
            imageCover: z.string({
                required_error: 'A tour must have an image cover'
            }),
            images: z.array(z.string()),
            startDates: z.array(z.string()),
            secretTour: z.boolean().default(false)
        })
        .refine(data => {
            if (data.priceDiscount !== undefined) {
                return data.priceDiscount < data.price;
            }
        })
};

const params = {
    params: z.object({
        id: z.string()
    })
};

const tourSchema = z.object({ ...payload });
export const createTourSchema = z.object({ ...payload });

export const getTourSchema = z.object({ ...params });

export const updateTourSchema = z.object({
    body: z.object({
        name: z.string().min(10).max(40).optional(),
        price: z.number().min(0).optional(),
        priceDiscount: z.number().min(0).optional(),
        ratingsAverage: z.number().min(1).max(5).optional(),
        ratingsQuantity: z.number().min(0).optional(),
        difficulty: z.enum(['easy', 'medium', 'difficult']).optional(),
        summary: z.string().optional(),
        description: z.string().optional(),
        imageCover: z.string().optional(),
        images: z.array(z.string()).optional(),
        startDates: z.array(z.string()).optional(),
        duration: z.number().min(0).optional(),
        maxGroupSize: z.number().min(0).optional(),
        secretTour: z.boolean().optional()
    }),
    ...params
});

export const getMonthlyPlanSchema = z.object({
    params: z.object({
        year: z.number()
    })
});

export type TourType = z.infer<typeof tourSchema>['body'];
export type CreateTourInput = z.infer<typeof createTourSchema>['body'];
export type GetTourParams = z.infer<typeof getTourSchema>['params'];
export type UpdateTourInput = z.infer<typeof updateTourSchema>['body'];
export type UpdateTourParams = z.infer<typeof updateTourSchema>['params'];
export type GetMonthlyPlanParams = z.infer<typeof getMonthlyPlanSchema>['params'];
