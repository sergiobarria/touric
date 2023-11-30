import type { FastifyInstance } from 'fastify';

import * as controllers from './users.controllers';

export async function usersRoutes(app: FastifyInstance) {
    app.get('/', {}, controllers.getUsersHandler);
    app.get('/:id', {}, controllers.getUserHandler);
    app.post('/', {}, controllers.createUserHandler);
    app.patch('/:id', {}, controllers.updateUserHandler);
    app.delete('/:id', {}, controllers.deleteUserHandler);
}
