import express from 'express';

import { morganMiddleware } from './middleware/morgan.middleware';

const app = express();

// Apply middlewares
app.use(express.json());
app.use(morganMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
