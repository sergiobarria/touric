import { type FastifyInstance } from 'fastify';

import * as controllers from './tours.controllers';
import { createTourJsonSchema, deleteTourJsonSchema, getTourJsonSchema, updateTourJsonSchema } from './tours.schemas';

export async function tourRoutes(app: FastifyInstance): Promise<void> {
    app.post(
        '/',
        {
            schema: createTourJsonSchema,
        },
        controllers.createTourHandler,
    );
    app.get('/', {}, controllers.getToursHandler);
    app.get('/:id', { schema: getTourJsonSchema }, controllers.getTourHandler);
    app.patch('/:id', { schema: updateTourJsonSchema }, controllers.updateTourHandler);
    app.delete('/:id', { schema: deleteTourJsonSchema }, controllers.deleteTourHandler);
}
