import * as http from 'http';

import config from 'config';
import chalk from 'chalk';

import { app } from './app';
import { logger } from './utils';
import { connectToMongoDB } from './lib';

let server: http.Server;
const PORT = config.get<string>('PORT');
const NODE_ENV = config.get<string>('NODE_ENV');

async function main(): Promise<void> {
    server = http.createServer(app);

    await connectToMongoDB();

    try {
        server.listen(PORT, () => {
            logger.info(chalk.blueBright.bold.underline(`⇨ 🚀 Server running in ${NODE_ENV} mode on port ${PORT}`));
        });
    } catch (err: any) {
        logger.error(chalk.redBright.bold.underline(`⇨ ❌ Server error: ${err.message}`));
        process.exit(1);
    }
}

// function shutdown(): void {
//     logger.info(chalk.magentaBright.bold.underline('⇨ 🔴 Shutting down server...'));
//     void server.close();
// }

// process.on('SIGTERM', shutdown);
// process.on('SIGINT', shutdown);

void main();
