import * as http from 'http'

import chalk from 'chalk'

import { app } from './app'
import { logger } from './shared/utils/logger'
import { connectToMongoDB } from './shared/db/mongo'

const PORT = Number(process.env.PORT ?? 3000)
const HOST = '0.0.0.0'

let server: http.Server

// Handle uncaught exceptions globally
process.on('uncaughtException', err => {
  logger.error('Uncaught exception:', err)
  process.exit(1)
})

// Handle unhandled promise rejections globally
process.on('unhandledRejection', err => {
  logger.error('Unhandled rejection:', err)
  process.exit(1)
})

const startServer = async (): Promise<http.Server> => {
  server = http.createServer(app)

  // Connect to MongoDB
  await connectToMongoDB()

  // Listen on port
  server.listen(PORT, HOST, () => {
    logger.info(chalk.bgCyanBright(`Server listening on port ${PORT}`))
  })

  // Handle server errors
  server.on('error', err => {
    console.error('Server error:', err)
    server.close(() => {
      process.exit(1)
    })
  })

  return server
}

// Start the server and handle any errors
startServer()
  .then(server => {
    logger.info('Server started successfully')

    // Do any additional setup or initialization here 👇🏼

    // Gracefully shut down the server and exit the process if necessary
    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM signal')
      server.close(() => {
        logger.info('Server shutdown complete')
        process.exit(0)
      })
    })
  })
  .catch(err => {
    logger.error('Server startup error:', err)
    process.exit(1)
  })
