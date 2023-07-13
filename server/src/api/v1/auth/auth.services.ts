import { omit } from 'lodash';

import { UserModel, type User } from '@/models';

export const privateFields = ['password', 'passwordConfirm', '__v'];

export async function signup(data: any): Promise<Partial<User>> {
    const user = await UserModel.create(data);

    return omit(user.toObject(), privateFields);
}
