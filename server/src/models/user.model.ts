import { Schema, model, Document, Model, CallbackError } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

export enum Role {
  ADMIN = 'admin',
  LEAD_GUIDE = 'lead-guide',
  GUIDE = 'guide',
  USER = 'user'
}

export interface IUser {
  name: string
  email: string
  photo: string
  role: 'admin' | 'lead-guide' | 'guide' | 'user'
  password: string
  passwordConfirm?: string
  passwordChangedAt?: Date
}

export interface IUserMethods {
  comparePasswords: (candidatePassword: string, userPassword: string) => Promise<boolean>
  changedPasswordAfter: (JWTTimestamp: number) => boolean
}

type UserModelType = Model<IUser, {}, IUserMethods>

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUser, UserModelType, IUserMethods>({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (this: IUserDocument, el: string) {
        return el === this.password
      }
    }
  },
  passwordChangedAt: Date
})

// Password encryption
userSchema.pre<IUserDocument>(/save/, async function (next: (error?: CallbackError) => void) {
  if (!this.isModified('password')) return next() // Only run this function if password was actually modified

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12)

  // Delete passwordConfirm field
  this.passwordConfirm = undefined

  next()
})

// Compare passwords method
userSchema.methods.comparePasswords = async function (candidatePassword: string, userPassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword)

  return isMatch
}

// Check if password was changed after the token was issued
userSchema.methods.changedPasswordAfter = function (this: IUserDocument, JWTTimestamp: number) {
  if (this.passwordChangedAt !== undefined) {
    const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10) // Convert to seconds

    return JWTTimestamp < changedTimestamp
  }

  // False means NOT changed
  return false
}

export const UserModel = model<IUser, UserModelType>('User', userSchema)
