import express, { Response } from 'express';

import { toursRouter } from './tours/tours.router';

const router = express.Router();

router.use('/healthcheck', (_, res: Response) => {
  res.json({ status: 'OK' });
});

router.use('/tours', toursRouter);

export { router };
