import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_CONNECTION,
    ssl: true
});

export const db = drizzle(pool);
