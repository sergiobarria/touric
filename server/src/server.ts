import * as http from 'http'

import * as dotenv from 'dotenv'
import chalk from 'chalk'

import { logger } from '@/shared/utils/logger'

import app from './app'

dotenv.config()

const PORT = process.env.PORT ?? 3000
const ENV = process.env.NODE_ENV ?? 'development'

const startServer = async (): Promise<void> => {
  const server = http.createServer(app)

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

void startServer()
