import mongoose from 'mongoose';
import config from 'config';
import chalk from 'chalk';

import { logger } from '@/utils';

const MONGO_URI = config.get<string>('MONGO_URI');

export async function connectToMongoDB(): Promise<void> {
    try {
        const {
            connection: { host, port, name },
        } = await mongoose.connect(MONGO_URI);
        logger.info(
            chalk.greenBright.bold.underline(`⇨ 🗄️  Connected to MongoDB at ${host}:${port} - Database: ${name}`)
        );
    } catch (err: any) {
        logger.error(`⇨ ❌ MongoDB connection error: ${err.message}`);
    }
}
