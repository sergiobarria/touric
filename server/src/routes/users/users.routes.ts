import express from 'express'

import { getUsers, getUser, createUser, updateUser, deleteUser, updateMe } from './users.controller'
import { validateResource } from '@/middleware/validateResource.middleware'
import { updateMeSchema } from './users.schemas'
import { protectRoute } from '@/middleware/protectRoute.middleware'

const router = express.Router()

router.route('/update-me').patch(protectRoute, validateResource(updateMeSchema), updateMe)

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export { router as usersRouter }
