import * as fs from 'fs'
import * as path from 'path'

import * as mongoose from 'mongoose'
import dotenv from 'dotenv'
import chalk from 'chalk'

import { TourModel } from './models/tours.model'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI ?? ''
console.log('MONGO_URI', MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(chalk.green('Connected to MongoDB'))
  })
  .catch(err => {
    console.log(chalk.red('Error connecting to MongoDB', err))
  })

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../dev-data/data/tours-simple.json'), 'utf8')
)

const importData = async (): Promise<void> => {
  try {
    await TourModel.deleteMany()
    await TourModel.create(tours)
    console.log(chalk.green('Data successfully loaded!'))
    process.exit(0)
  } catch (err) {
    console.log(chalk.red(err))
    process.exit(1)
  }
}

const deleteData = async (): Promise<void> => {
  try {
    await TourModel.deleteMany()
    console.log(chalk.yellowBright('Data successfully deleted!'))
    process.exit(0)
  } catch (err) {
    console.log(chalk.red(err))
    process.exit(1)
  }
}

if (process.argv[2] === '--import') {
  void importData()
}

if (process.argv[2] === '--delete') {
  void deleteData()
}
