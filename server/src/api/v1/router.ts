import express from 'express';

import { toursRouter } from './tours/tours.router';
import { usersRouter } from './users/users.router';

export const routerV1 = express();

// ===== Register API V1 Routes 👇🏼 =====
routerV1.use('/tours', toursRouter);
routerV1.use('/users', usersRouter);
