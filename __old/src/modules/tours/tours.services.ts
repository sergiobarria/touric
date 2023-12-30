import { eq, and, gte, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { omit, isNumber, includes, values } from 'lodash';

import { db } from '@/db';
import { type DifficultyEnum, tours, difficultyEnumValues } from '@/db/schemas';
import type { GetToursQuery } from './tours.schemas';
import { type PgSelect } from 'drizzle-orm/pg-core';

type CreateTourInput = InferInsertModel<typeof tours>;
type SelectTour = InferSelectModel<typeof tours>;

export async function createTour(data: CreateTourInput): Promise<SelectTour | null> {
    const result = await db.insert(tours).values(data).returning();

    return result?.at(0) ?? null;
}

function withPagination<T extends PgSelect>(qb: T, page: number, pageSize: number = 10): T {
    return qb.limit(pageSize).offset(page * pageSize);
}

export async function getTours(querystring: GetToursQuery): Promise<SelectTour[]> {
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    const queryObj = omit(querystring, excludedFields);

    // build query
    let query = db.select().from(tours).$dynamic();

    // filtering conditions
    const conditions = [];
    if (includes(values(difficultyEnumValues), queryObj.difficulty))
        conditions.push(eq(tours.difficulty, queryObj.difficulty as DifficultyEnum));
    if (isNumber(queryObj.duration)) conditions.push(gte(tours.duration, queryObj.duration));

    if (conditions.length > 0) query = query.where(and(...conditions));

    // execute query
    const results = await query;

    return results;
}

export async function getTourByID(id: string): Promise<SelectTour | null> {
    const result = await db.select().from(tours).where(eq(tours.id, id));

    return result?.at(0) ?? null;
}

export async function updateTour(id: string, data: Partial<CreateTourInput>): Promise<SelectTour | null> {
    const result = await db.update(tours).set(data).where(eq(tours.id, id)).returning();

    return result?.at(0) ?? null;
}

export async function deleteTour(id: string): Promise<boolean> {
    const deletedTour = await db.delete(tours).where(eq(tours.id, id)).returning({ deletedID: tours.id });

    return deletedTour.length === 1;
}
