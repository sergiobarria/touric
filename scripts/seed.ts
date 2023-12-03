import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { tours } from '@/db/schemas';
import type { InferInsertModel } from 'drizzle-orm';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_CONNECTION,
    ssl: true,
});

export const db = drizzle(pool);
const toursData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/tours-simple.json'), 'utf-8'));
// add more resources seed data here 👇

async function seedTours(): Promise<void> {
    const toursSeedData = toursData.map((tour: InferInsertModel<typeof tours>) => {
        const { id, ...rest } = tour;
        return { ...rest };
    });

    for (const tour of toursSeedData) {
        const createdTour = await db.insert(tours).values(tour).returning({ name: tours.name });
        console.log(`✅ ⇨ Tour ${createdTour?.at(0)?.name} created successfully`);
    }
}

async function seedDatabase(): Promise<void> {
    console.log('🌱 ⇨ Seeding database...');

    try {
        await seedTours();
        // add more tables here 👇

        console.log('✅ ⇨ Database seeded successfully');
        process.exit(0);
    } catch (error: unknown) {
        console.error('💥 SEED ERROR: ', error);
        process.exit(1);
    }
}

async function destroyData(): Promise<void> {
    try {
        await db.delete(tours);
        console.log('✅ ⇨ Tours records deleted successfully');
        // add more tables here 👇

        console.log('✅ ⇨ Database tables records deleted successfully');
        process.exit(0);
    } catch (error: unknown) {
        console.error('💥 DESTROY ERROR: ', error);
        process.exit(1);
    }
}

const args = process.argv.slice(2);

if (args.at(0) === '--import' || args.at(0) === '-i') {
    void seedDatabase();
}

if (args.at(0) === '--destroy' || args.at(0) === '-d') {
    void destroyData();
}
