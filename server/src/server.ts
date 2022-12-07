import * as http from 'http'

import * as dotenv from 'dotenv'
import chalk from 'chalk'

import { logger } from '@/shared/utils/logger'
import { mongoConnect } from '@/services/mongo'

import app from './app'

dotenv.config()

let server: http.Server

const PORT = process.env.PORT ?? 3000
const ENV = process.env.NODE_ENV ?? 'development'

process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  logger.error(err.name, err.message)
  process.exit(1)
})

const startServer = async (): Promise<void> => {
  server = http.createServer(app)

  // Connect to MongoDB
  await mongoConnect()

  try {
    server.listen(PORT, () => {
      logger.info(
        chalk.green(`Server is running on port ${chalk.bold(PORT)} in ${chalk.bold(ENV)} mode`)
      )
    })
  } catch (err: any) {
    logger.error(err)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  server.close(() => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting server down...')
    logger.error(err)
    process.exit(1)
  })
})

void startServer()
