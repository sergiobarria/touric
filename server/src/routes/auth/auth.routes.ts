import * as express from 'express'

import { validateResource } from '@/middleware/validateResource.middleware'
import { forgotPassword, login, resetPassword, signup } from './auth.controller'
import { loginSchema, signupSchema } from './auth.schemas'

const router = express.Router()

router.route('/signup').post(validateResource(signupSchema), signup)
router.route('/login').post(validateResource(loginSchema), login)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').patch(resetPassword)

export { router as authRouter }
