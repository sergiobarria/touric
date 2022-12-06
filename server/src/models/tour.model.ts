import { Model, model, Schema } from 'mongoose'

export const tourPrivateFields = ['__v']

interface TourSchema {
  name: string
  duration: number
  maxGroupSize: number
  difficulty: 'easy' | 'medium' | 'difficult'
  ratingsAverage: number
  ratingQuantity: number
  price: number
  priceDiscount: number
  summary: string
  description: string
  imageCover: string
  images: string[]
  startDates: Date[]
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
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult']
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    startDates: [Date]
  },
  {
    timestamps: true
  }
)

export const TourModel = model('Tour', tourSchema) as Tour
