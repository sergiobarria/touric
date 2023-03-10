import * as express from 'express'

import { validateResource } from '@/middleware/validateResource.middleware'
import { login, signup } from './auth.controller'
import { loginSchema, signupSchema } from './auth.schemas'

const router = express.Router()

router.route('/signup').post(validateResource(signupSchema), signup)
router.route('/login').post(validateResource(loginSchema), login)

export { router as authRouter }
