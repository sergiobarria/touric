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

export type CreateTourBody = z.infer<typeof createTourBodySchema>;
export type GetTourParams = z.infer<typeof getTourSchema>;

export const createTourJsonSchema = {
    body: zodToJasonSchema(createTourBodySchema, 'createTourBodySchema'),
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
