import * as http from 'http'

import chalk from 'chalk'

import { app } from './app'
import { logger } from './shared/utils/logger'
// import { connectToMongoDB } from './shared/db/mongo'

const PORT = Number(process.env.PORT ?? 3000)
const HOST = '0.0.0.0'

let server: http.Server

const startServer = async (): Promise<void> => {
  server = http.createServer(app)

  // Connect to MongoDB
  // await connectToMongoDB() // TODO: Uncomment this line when you have MongoDB setup

  try {
    server.listen(PORT, HOST, () => {
      logger.info(chalk.greenBright(`Server is running on http://${HOST}:${PORT}`))
    })
  } catch (error) {
    logger.error(chalk.redBright(error))
  }
}

void startServer()
