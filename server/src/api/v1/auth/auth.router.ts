import express from 'express';

import { signupHandler } from './auth.controller';
import { validate } from '@/middlewares';
import { signupSchema } from './auth.schemas';

const router = express.Router();

router.post('/signup', validate(signupSchema), signupHandler);

export { router as authRouter };
