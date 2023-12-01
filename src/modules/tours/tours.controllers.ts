import fs from 'fs';
import path from 'path';

import type { FastifyReply, FastifyRequest } from 'fastify';
import status from 'http-status';

import { type GetTourParams, type CreateTourBody } from './tours.schemas';
import * as services from './tours.services';

const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../../data/tours-simple.json')).toString()
);

export async function createTourHandler(
    request: FastifyRequest<{ Body: CreateTourBody }>,
    reply: FastifyReply
) {
    const tour = await services.createOne({ ...request.body });

    return reply.code(status.CREATED).send({
        status: 'success',
        data: { tour }
    });
}

export async function getToursHandler(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(status.OK).send({
        status: 'success',
        results: tours.length,
        data: { tours }
    });
}

export async function getTourHandler(
    request: FastifyRequest<{ Params: GetTourParams }>,
    reply: FastifyReply
) {
    const { id } = request.params;

    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        data: { tour: 'Get tour', id }
    });
}

export async function updateTourHandler(
    request: FastifyRequest<{ Params: GetTourParams }>,
    reply: FastifyReply
) {
    const { id } = request.params;

    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        data: { tour: 'Update tour', id }
    });
}

export async function deleteTourHandler(
    request: FastifyRequest<{ Params: GetTourParams }>,
    reply: FastifyReply
) {
    const { id } = request.params;

    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        data: { tour: 'Delete tour', id }
    });
}
