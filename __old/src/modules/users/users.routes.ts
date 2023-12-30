import type { FastifyInstance } from 'fastify';

import * as controllers from './users.controllers';

export async function userRoutes(app: FastifyInstance): Promise<void> {
    app.post('/', {}, controllers.createUserHandler);
    app.get('/', {}, controllers.getUsersHandler);
    app.get('/:id', {}, controllers.getUserHandler);
    app.patch('/:id', {}, controllers.updateUserHandler);
    app.delete('/:id', {}, controllers.deleteUserHandler);
}
