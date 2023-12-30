import { tours } from '@/db/schemas';
import { createInsertSchema } from 'drizzle-zod';
import zodToJasonSchema from 'zod-to-json-schema';
import { z } from 'zod';

const createTourBodySchema = createInsertSchema(tours, {
    images: z.array(z.string()),
    startDates: z.array(z.string()),
});

const getTourSchema = z.object({
    id: z.string().uuid(),
});

const getToursQuerySchema = z.object({
    duration: z.number().int().positive().optional(),
    difficulty: z.enum(['easy', 'medium', 'difficult']).optional(),
    page: z.number().int().positive().optional(),
});

export type CreateTourBody = z.infer<typeof createTourBodySchema>;
export type GetTourParams = z.infer<typeof getTourSchema>;
export type GetToursQuery = z.infer<typeof getToursQuerySchema>;

export const createTourJsonSchema = {
    body: zodToJasonSchema(createTourBodySchema, 'createTourBodySchema'),
};

export const getToursJsonSchema = {
    querystring: zodToJasonSchema(getToursQuerySchema, 'getToursQuerySchema'),
};

export const getTourJsonSchema = {
    params: zodToJasonSchema(getTourSchema, 'getTourSchema'),
};

export const updateTourJsonSchema = {
    body: zodToJasonSchema(createTourBodySchema.partial(), 'createTourBodySchema'),
    params: zodToJasonSchema(getTourSchema, 'getTourSchema'),
};

export const deleteTourJsonSchema = {
    params: zodToJasonSchema(getTourSchema, 'getTourSchema'),
};
