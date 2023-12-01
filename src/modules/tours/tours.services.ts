import { type InferInsertModel } from 'drizzle-orm';
import { db } from '@/db';
import { tours } from '@/db/schemas';

export async function createOne(data: InferInsertModel<typeof tours>) {
    const result = await db.insert(tours).values(data).returning();

    return result.at(0);
}
