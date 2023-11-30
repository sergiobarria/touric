import type { FastifyInstance } from 'fastify';

import * as controllers from './tours.controllers';
import { createTourSchema, getTourSchema } from './tours.schemas';

export async function toursRoutes(app: FastifyInstance) {
    app.get('/', {}, controllers.getToursHandler);
    app.get('/:id', { schema: { params: getTourSchema } }, controllers.getTourHandler);
    app.post('/', { schema: { body: createTourSchema } }, controllers.createTourHandler);
    app.patch('/:id', { schema: { params: getTourSchema } }, controllers.updateTourHandler);
    app.delete('/:id', { schema: { params: getTourSchema } }, controllers.deleteTourHandler);
}
