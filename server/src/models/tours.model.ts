import { Schema, model, Document } from 'mongoose'

export interface ITour {
  name: string
  duration: number
  maxGroupSize: number
  difficulty: string
  ratingsAverage: number
  ratingsQuantity: number
  price: number
  priceDiscount?: number
  summary: string
  description: string
  imageCover: string
  images: string[]
  startDates: string[]
}

const tourSchema = new Schema<ITour & Document>(
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
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
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
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
    timestamps: true
  }
)

export const TourModel = model<ITour>('Tour', tourSchema)
