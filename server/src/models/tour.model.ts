import { Model, model, Schema } from 'mongoose'

export const tourPrivateFields = ['__v']

interface TourSchema {
  name: string
  rating: number
  price: number
}

interface TourMethods {
  matchPassword: (password: string) => Promise<boolean>
}

type Tour = Model<TourSchema, {}, TourMethods>

const tourSchema = new Schema<TourSchema, TourMethods, Tour>(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
  },
  {
    timestamps: true
  }
)

export const TourModel = model('Tour', tourSchema) as Tour
