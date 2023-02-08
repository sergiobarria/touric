import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import chalk from 'chalk';

import { logger } from '@/shared/utils/logger';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? '';

export const mongoConnect = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false); // this will be the default in the next major release of mongoose v7
    await mongoose.connect(MONGO_URI);
    logger.info(
      chalk.blueBright.bold.underline(`Connected to MongoDB at ${MONGO_URI}`)
    );
  } catch (err) {
    logger.error(
      chalk.red.bold.underline(`Error connecting to MongoDB at ${MONGO_URI}`)
    );
    logger.error(err);
  }
};
