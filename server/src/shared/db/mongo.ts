import * as mongoose from 'mongoose'

import chalk from 'chalk'

import { logger } from '@/shared/utils/logger'

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://0.0.0.0:27017/touric'

export const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {})
    logger.info(chalk.bgCyanBright('Connected to MongoDB'))
  } catch (error) {
    logger.error(chalk.bgRedBright('Failed to connect to MongoDB'), error)
  }
}
