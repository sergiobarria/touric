import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db } from '../src/db';

async function main(): Promise<void> {
    console.log('🚀 ⇨ Migrating database...');
    try {
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('✅ ⇨ Database migrated successfully');
        process.exit(0);
    } catch (error: unknown) {
        console.error('💥 MIGRATION ERROR: ', error);
        process.exit(1);
    }
}

void main();
