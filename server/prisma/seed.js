/* eslint-disable */
const fs = require('fs');
const path = require('path');

const slugify = require('slugify');

const { prisma } = require('../services/prismaClient');

async function seeder() {
  // Read JSON file
  const tours = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../dev-data/data/tours-simple.json'),
      'utf-8'
    )
  );

  for (const tour of tours) {
    const slug = slugify(tour.name.toLowerCase());
    await prisma.tour.create({
      data: { ...tour, slug },
    });
  }
}

seeder()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
