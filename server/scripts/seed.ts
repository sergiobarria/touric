import * as path from 'path';
import * as fs from 'fs';

import mongoose from 'mongoose';
import chalk from 'chalk';
import config from 'config';

import { TourModel } from '../src/models';

const NODE_ENV = config.get<string>('NODE_ENV');
const MONGO_URI_LOCAL = config.get<string>('MONGO_URI');
const MONGO_URI_PROD = config.get<string>('MONGO_URI_PROD');
const URI = NODE_ENV === 'production' ? MONGO_URI_PROD : MONGO_URI_LOCAL;

mongoose
    .connect(URI)
    .then(() => {
        console.log(chalk.green('⇨ 🗄️  Connection to MongoDB successful'));
    })
    .catch(err => {
        console.log(chalk.red('⇨ ❌ Failed to connect to MongoDB'));
        console.log(chalk.red(err));
    });

// Get collections
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/data/', 'tours-simple.json'), 'utf-8'));

// ===== SEED DATA FUNCTION =====
async function seedData() {
    try {
        console.log(chalk.yellowBright('⇨ 🗑️  Destroying old data...'));
        await TourModel.deleteMany({}); // empty the collection

        console.log(chalk.green('⇨ 🌱 Seeding data...'));
        await TourModel.create(tours); // insert the data
        console.log(chalk.green('⇨ ✅ Data successfully loaded'));
    } catch (error) {
        console.log(chalk.red('⇨ ❌ Failed to load data', error));
        process.exit(1);
    } finally {
        console.log(chalk.blueBright('Script execution completed'));
        await mongoose.connection.close();
        process.exit();
    }
}

// ===== DESTROY DATA FUNCTION =====
async function destroyData() {
    try {
        console.log(chalk.yellowBright('⇨ 🗑️  Destroying old data...'));
        await TourModel.deleteMany({});
    } catch (error) {
        console.log(chalk.red('⇨ ❌ Failed to destroy data', error));
        process.exit(1);
    } finally {
        console.log(chalk.blueBright('Script execution completed'));
        await mongoose.connection.close();
        process.exit();
    }
}

// ===== SCRIPT EXECUTION =====
const CMD = process.argv[2];

if (CMD === '--import' || CMD === '-i') seedData();
else if (CMD === '--destroy' || CMD === '-d') destroyData();
else {
    console.log(chalk.red('⇨ ❌ Invalid command'));
    process.exit(1);
}
