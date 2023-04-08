import express from 'express'

import * as usersController from './users.controller'

const router = express.Router()

router.route('/').get(usersController.getUsersHandler).post(usersController.createUserHandler)
router
    .route('/:id')
    .get(usersController.getUserHandler)
    .patch(usersController.updateUserHandler)
    .delete(usersController.deleteUserHandler)

export { router as usersRouter }
