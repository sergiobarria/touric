import type { Config } from 'drizzle-kit';

export default {
    schema: 'src/db/schemas.ts',
    out: 'migrations',
    dbCredentials: {
        connectionString: process.env.DATABASE_CONNECTION as string,
    },
    breakpoints: false,
} satisfies Config;
