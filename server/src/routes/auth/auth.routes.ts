import * as express from 'express'

import { validateResource } from '@/middleware/validateResource.middleware'
import { forgotPassword, login, resetPassword, signup, updatePassword } from './auth.controller'
import { loginSchema, signupSchema, updatePasswordSchema } from './auth.schemas'
import { protectRoute } from '@/middleware/protectRoute.middleware'

const router = express.Router()

router.route('/signup').post(validateResource(signupSchema), signup)
router.route('/login').post(validateResource(loginSchema), login)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').patch(resetPassword)
router.route('/update-my-password').patch(protectRoute, validateResource(updatePasswordSchema), updatePassword)

export { router as authRouter }
