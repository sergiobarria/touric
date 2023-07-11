import express from 'express';

import {
    createUserHandler,
    getUsersHandler,
    getUserHandler,
    updateUserHandler,
    deleteUserHandler,
} from './users.controller';

const router = express.Router();

/**
 * @route  GET, POST /api/v1/tours/
 */
router.route('/').get(getUsersHandler).post(createUserHandler);

/**
 * @route  GET, PATCH, DELETE /api/v1/tours/:id
 */
router.route('/:id').get(getUserHandler).patch(updateUserHandler).delete(deleteUserHandler);

export { router as usersRouter };
