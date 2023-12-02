import type { FastifyReply, FastifyRequest } from 'fastify';
import status from 'http-status';

import type { CreateTourBody, GetTourParams } from './tours.schemas';
import * as services from './tours.services';

export async function createTourHandler(
    request: FastifyRequest<{ Body: CreateTourBody }>,
    reply: FastifyReply,
): Promise<FastifyReply> {
    const tour = await services.createTour(request.body);

    return reply.code(status.CREATED).send({
        success: true,
        data: { tour },
    });
}

export async function getToursHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const tours = await services.getTours();

    return reply.code(status.OK).send({
        success: true,
        results: tours.length,
        data: { tours },
    });
}

export async function getTourHandler(
    request: FastifyRequest<{ Params: GetTourParams }>,
    reply: FastifyReply,
): Promise<FastifyReply> {
    const tour = await services.getTourByID(request.params.id);

    if (tour === null) {
        return reply.code(status.NOT_FOUND).send({
            success: false,
            message: 'Tour not found',
        });
    }

    return reply.code(status.OK).send({
        success: true,
        data: { tour },
    });
}

export async function updateTourHandler(
    request: FastifyRequest<{ Params: GetTourParams; Body: Partial<CreateTourBody> }>,
    reply: FastifyReply,
): Promise<FastifyReply> {
    const tour = await services.updateTour(request.params.id, request.body);

    if (tour === null) {
        return reply.code(status.NOT_FOUND).send({
            success: false,
            message: 'Tour not found',
        });
    }

    return reply.code(status.OK).send({
        success: true,
        data: { tour },
    });
}

export async function deleteTourHandler(
    request: FastifyRequest<{ Params: GetTourParams }>,
    reply: FastifyReply,
): Promise<FastifyReply> {
    const success = await services.deleteTour(request.params.id);

    if (!success) {
        return reply.code(status.NOT_FOUND).send({
            success: false,
            message: 'Tour not found',
        });
    }

    return reply.code(status.NO_CONTENT).send();
}
