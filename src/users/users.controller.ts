import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller({
    path: 'users',
    version: '1',
})
export class UsersController {
    @Get()
    getUsers(): Record<string, string> {
        return { message: 'get all users' };
    }

    @Get('/:id')
    getUser(): string {
        return 'get a single user';
    }

    @Post()
    createUser(): string {
        return 'create a new user';
    }

    @Patch('/:id')
    updateUser(): string {
        return 'update a user';
    }

    @Delete('/:id')
    deleteUser(): string {
        return 'delete a user';
    }
}
