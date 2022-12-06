/* eslint-disable */
import * as fs from 'fs'
import * as path from 'path'

import * as dotenv from 'dotenv'
import chalk from 'chalk'
import * as mongoose from 'mongoose'

import { TourModel } from '../../models/tour.model'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI ?? ''

mongoose
  .connect(MONGO_URI)
  .then(() =>
    console.log(chalk.magentaBright.bold.underline(`Connected to MongoDB at ${MONGO_URI}`))
  )
  .catch(err => {
    console.log(chalk.red.bold.underline(`Error connecting to MongoDB at ${MONGO_URI}`))
    console.log(err)
  })

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../../dev-data/data/tours-simple.json'), 'utf-8')
)

const importData = async (): Promise<void> => {
  try {
    await TourModel.create(tours)
    console.log(chalk.greenBright.bold.underline('Data successfully loaded!'))

    process.exit(0)
  } catch (err) {
    console.log(chalk.redBright.bold.underline('Error loading data!'))
    console.log(err)

    process.exit(1)
  }
}

const deleteData = async (): Promise<void> => {
  try {
    await TourModel.deleteMany()
    console.log(chalk.greenBright.bold.underline('Data successfully deleted!'))

    process.exit(0)
  } catch (err) {
    console.log(chalk.redBright.bold.underline('Error deleting data!'))
    console.log(err)

    process.exit(1)
  }
}

const [command] = process.argv.slice(2)

if (command === '--import' || command === '-i') {
  void importData()
}

if (command === '--delete' || command === '-d') {
  void deleteData()
}
