import type { FastifyReply, FastifyRequest } from 'fastify';
import status from 'http-status';

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.code(status.NOT_IMPLEMENTED).send({
        success: false,
        message: 'Not implemented',
    });
}

export async function getUsersHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.code(status.NOT_IMPLEMENTED).send({
        success: false,
        message: 'Not implemented',
    });
}

export async function getUserHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.code(status.NOT_IMPLEMENTED).send({
        success: false,
        message: 'Not implemented',
    });
}

export async function updateUserHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.code(status.NOT_IMPLEMENTED).send({
        success: false,
        message: 'Not implemented',
    });
}

export async function deleteUserHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.code(status.NOT_IMPLEMENTED).send({
        success: false,
        message: 'Not implemented',
    });
}
