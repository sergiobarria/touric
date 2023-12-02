import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
    dotenv: true,
    schema: z.object({
        PORT: z.number().default(3000),
        HOST: z.string().default('0.0.0.0'),
        NODE_ENV: z.enum(['development', 'production']).default('development'),
        DATABASE_CONNECTION: z.string(),
    }),
});
