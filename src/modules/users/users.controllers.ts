import type { FastifyReply, FastifyRequest } from 'fastify';
import status from 'http-status';

export async function getUsersHandler(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(status.OK).send({
        status: 'success',
        data: { users: [] }
    });
}

export async function getUserHandler(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        message: 'Not implemented'
    });
}

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        message: 'Not implemented'
    });
}

export async function updateUserHandler(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        message: 'Not implemented'
    });
}

export async function deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(status.NOT_IMPLEMENTED).send({
        status: 'success',
        message: 'Not implemented'
    });
}
