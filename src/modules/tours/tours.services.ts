import { eq, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

import { db } from '@/db';
import { tours } from '@/db/schemas';

type CreateTourInput = InferInsertModel<typeof tours>;
type SelectTour = InferSelectModel<typeof tours>;

export async function createTour(data: CreateTourInput): Promise<SelectTour | null> {
    const result = await db.insert(tours).values(data).returning();

    return result?.at(0) ?? null;
}

export async function getTours(): Promise<SelectTour[]> {
    const result = await db.select().from(tours);

    return result;
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
