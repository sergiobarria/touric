import {
    pgTable,
    text,
    real,
    integer,
    pgEnum,
    timestamp,
    decimal,
    uuid,
    varchar
} from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'difficult']);

export const tours = pgTable('tours', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull(),
    duration: integer('duration').notNull(),
    maxGroupSize: integer('max_group_size').notNull(),
    difficulty: difficultyEnum('difficulty').notNull().default('easy'),
    ratingsAverage: real('ratings_average').notNull().default(4.5),
    ratingsQuantity: integer('ratings_quantity').notNull().default(0),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    priceDiscount: decimal('price_discount', { precision: 10, scale: 2 }),
    summary: text('summary').notNull(),
    description: text('description'),
    imageCover: text('image_cover').notNull(),
    images: text('images').array(),
    startDates: text('start_dates').array(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});
