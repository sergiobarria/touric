import * as http from 'http';

import chalk from 'chalk';

import { app } from './app';
import { logger } from '@/shared/utils/logger';

let server: http.Server;

const startServer = async (): Promise<void> => {
  server = http.createServer(app);

  try {
    server.listen(3000, () => {
      logger.info(
        chalk.greenBright(
          `Server is running on port ${chalk.bold(3000)} in ${chalk.bold(
            process.env.NODE_ENV
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
