import express from 'express';

import {
    createUserHandler,
    getUsersHandler,
    getUserHandler,
    updateUserHandler,
    deleteUserHandler,
} from './users.controller';

const router = express.Router();

router.route('/').get(getUsersHandler).post(createUserHandler);

router.route('/:id').get(getUserHandler).patch(updateUserHandler).delete(deleteUserHandler);

export { router as usersRouter };
