/* eslint-disable */

require('dotenv').config({ path: '../config.env' });
require('colors');

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Tour = require('../models/tour.model');
const { mongoConnect } = require('../services/client');

// await mongoConnect();

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    'utf-8'
  )
);

// Import data into DB
const importData = async () => {
  try {
    await mongoConnect();
    await Tour.create(tours);
    console.log('Data successfully loaded!'.green.bold);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await mongoConnect();
    await Tour.deleteMany();
    console.log('Data successfully deleted!'.red.bold);
  } catch (err) {
    console.error(err);
  }

  process.exit();
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
