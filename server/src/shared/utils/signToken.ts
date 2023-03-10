import jwt from 'jsonwebtoken'
import { ObjectId } from 'bson'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string

export const signToken = (id: string | ObjectId): string => {
  // Convert ObjectId to string
  if (id instanceof ObjectId) {
    id = id.toString()
  }

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })
}
