import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_URI_PROD: process.env.MONGO_URI_PROD,
};
