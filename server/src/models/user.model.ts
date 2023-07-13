import mongoose from 'mongoose';
import validator from 'validator';
import config from 'config';
import bcrypt from 'bcryptjs';

export interface User extends mongoose.Document {
    name: string;
    email: string;
    photo: string;
    password: string;
    passwordConfirm?: string;
}

const userSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name!'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        photo: String,
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            // select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (this: User, el: string): boolean {
                    return el === this.password;
                },
                message: 'Passwords are not the same!',
            },
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

userSchema.pre('save', async function (this: User, next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    const rounds = config.get<number>('SALT_ROUNDS');
    this.password = await bcrypt.hash(this.password, Number(rounds));

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;

    next();
});

export const UserModel = mongoose.model<User>('User', userSchema);
