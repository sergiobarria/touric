import { Type, type Static } from '@sinclair/typebox';
import { createInsertSchema } from 'drizzle-typebox';
import { tours } from '@/db/schemas';

// NOTE: type inferace was not working right for images and startDates so I had to manually override them
export const insertToursSchema = createInsertSchema(tours, {
    images: Type.Optional(Type.Array(Type.String())),
    startDates: Type.Optional(Type.Array(Type.String()))
});

export type CreateTourBody = Static<typeof insertToursSchema>;

// export const createTourSchema = Type.Object({
//     price: Type.Number({ minimum: 1 }),
//     name: Type.String({ minLength: 3, maxLength: 50 }),
//     duration: Type.Number({ minimum: 1, maximum: 7 }),
//     maxGroupSize: Type.Number({ minimum: 1, maximum: 10 }),
//     difficulty: Type.String({ enum: ['easy', 'medium', 'difficult'] }),
//     ratingsAverage: Type.Number({ minimum: 1, maximum: 5 }),
//     ratingsQuantity: Type.Optional(Type.Number()),
//     priceDiscount: Type.Optional(Type.Number()),
//     summary: Type.String({ minLength: 10, maxLength: 1000 }),
//     description: Type.Optional(Type.String({ minLength: 10, maxLength: 10000 })),
//     imageCover: Type.String(),
//     images: Type.Optional(Type.Array(Type.String())),
//     startDates: Type.Optional(Type.Array(Type.String()))
// });

export const getTourSchema = Type.Object({
    id: Type.String({ format: 'uuid' })
});

// export type CreateTourBody = Static<typeof createTourSchema>;
export type GetTourParams = Static<typeof getTourSchema>;
