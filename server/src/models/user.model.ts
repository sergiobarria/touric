import * as crypto from 'crypto'

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
  password?: string
  passwordConfirm?: string
  passwordChangedAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: number
  active?: boolean
}

export interface IUserMethods {
  comparePasswords: (candidatePassword: string, userPassword: string) => Promise<boolean>
  changedPasswordAfter: (JWTTimestamp: number) => boolean
  createPasswordResetToken: () => string
}

export type UserModelType = Model<IUser, {}, IUserMethods>

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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Number,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

// Password encryption
userSchema.pre<IUserDocument>(/save/, async function (next: (error?: CallbackError) => void) {
  if (!this.isModified('password')) return next() // Only run this function if password was actually modified

  // Hash the password
  if (this.password !== undefined) {
    this.password = await bcrypt.hash(this.password, 12)
  }

  // Delete passwordConfirm field
  this.passwordConfirm = undefined

  next()
})

// Password changed at property
userSchema.pre<IUserDocument>(/save/, function (this: IUserDocument, next: (error?: CallbackError) => void) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = new Date(Date.now() - 1000) // Subtract 1 second to make sure the token is issued after the password was changed

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

// Create password reset token
userSchema.methods.createPasswordResetToken = function (this: IUserDocument) {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

  return resetToken
}

// Query middleware to exclude inactive users
userSchema.pre<IUserDocument>(/^find/, function (this: any, next: (error?: CallbackError) => void) {
  // this points to the current query
  this.find({ active: { $ne: false } })

  next()
})

export const UserModel = model<IUser, UserModelType>('User', userSchema)
