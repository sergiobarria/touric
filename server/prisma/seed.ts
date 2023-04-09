import * as fs from 'fs'
import * as path from 'path'

import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

import { toursMiddleware } from '../src/middlewares'

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/data/tours-simple.json'), 'utf-8'))

const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()
    // Add needed middleware here 👇🏼
    prisma.$use(toursMiddleware)

    console.log(chalk.greenBright.bold.underline('⇨ 🌱 Seeding the database...'))
    console.log(chalk.yellowBright.bold.underline('⇨ 🗑️ Deleting old tours...'))
    await prisma.tours.deleteMany()

    for (const tour of tours) {
        delete tour.id
        await prisma.tours.create({ data: { ...tour } })
        console.log(chalk.greenBright.bold(`⇨ ✅ Created tour: ${tour.name}`))
    }
}

main()
    .catch((e: any) => {
        console.error(chalk.redBright.bold.underline(`⇨ ❌ Database seeding error: ${e.message}`))
        process.exit(1)
    })
    .finally(async () => {
        console.log(chalk.greenBright.bold.underline('⇨ 🌱 Seeding complete!'))
        await prisma.$disconnect()
    })
