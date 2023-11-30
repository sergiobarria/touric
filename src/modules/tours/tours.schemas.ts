import { Type, type Static } from '@sinclair/typebox';

export const createTourSchema = Type.Object({
    name: Type.String({ minLength: 3, maxLength: 50 })
});

export const getTourSchema = Type.Object({
    id: Type.String({ format: 'uuid' })
});

export type CreateTourBody = Static<typeof createTourSchema>;
export type GetTourParams = Static<typeof getTourSchema>;
