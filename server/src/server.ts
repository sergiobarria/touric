import * as http from 'http';

import chalk from 'chalk';
import * as dotenv from 'dotenv';

import { app } from './app';
import { logger } from './shared/utils/logger';
import { mongoConnect } from './config/mongo';

dotenv.config();

let server: http.Server;

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async (): Promise<void> => {
  server = http.createServer(app);

  // Connect to MongoDB
  await mongoConnect();

  try {
    server.listen(PORT, () => {
      logger.info(
        chalk.greenBright(
          `Server is running on port ${chalk.bold(PORT)} in ${chalk.bold(
            NODE_ENV
          )} mode`
        )
      );
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

void startServer();
