import express from 'express'

import { routes } from '@/shared/constants/routes'
import { validateResource } from '@/middleware/validateResource.middleware'
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '@/modules/users/users.controller'
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema
} from '@/modules/users/users.schema'

const router = express.Router()

router.route(routes.users).get(getAllUsers).post(validateResource(createUserSchema), createUser)

router
  .route(routes.user)
  .get(validateResource(getUserSchema), getUser)
  .patch(validateResource(updateUserSchema), updateUser)
  .delete(validateResource(deleteUserSchema), deleteUser)

export { router as usersRouter }
