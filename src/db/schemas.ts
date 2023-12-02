import { uuid, pgTable, integer, varchar, pgEnum, text, decimal } from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'difficult']);

export const tours = pgTable('tours', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull(),
    duration: integer('duration').notNull(),
    maxGroupSize: integer('max_group_size').notNull(),
    difficulty: difficultyEnum('difficulty').notNull(),
    ratingsAvg: decimal('ratings_avg', { precision: 2, scale: 1 }).notNull(),
    ratingsQty: integer('ratings_qty').notNull(),
    price: decimal('price', { precision: 8, scale: 2 }).notNull(),
    priceDiscount: decimal('price_discount', { precision: 8, scale: 2 }),
    summary: varchar('summary', { length: 256 }).notNull(),
    description: text('description'),
    imageCover: varchar('image_cover', { length: 256 }).notNull(),
    images: text('images').array(),
    startDates: text('start_dates').array(),
});
