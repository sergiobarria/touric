const mongoose = require('mongoose');

require('dotenv').config();

// TODO: Update to use a mongo atlas string instead of local before deployment
const MONGO_URL = process.env.DATABASE_LOCAL;

mongoose.connection.once('open', () => {
  // eslint-disable-next-line
  console.log(`MongoDB connection ready!`.cyan.underline.bold);
});

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line
  console.error(err);
});

// connect to db
async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

// disconnect from db
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
