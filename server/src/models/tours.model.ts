import { Schema, model, Document, Model, CallbackError } from 'mongoose'
import slugify from 'slugify'
// import validator from 'validator'

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
  slug?: string
  secretTour?: boolean
}

export interface ITourMethods {
  slugifyName: () => void
}

type TourModelType = Model<ITour, {}, ITourMethods>

export interface ITourDocument extends ITour, Document {}

const tourSchema = new Schema<ITour, TourModelType, ITourMethods>(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
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
      type: Number,
      validate: {
        // This only points to current doc on NEW document creation (not on update)
        validator: function (this: ITourDocument, val: number): boolean {
          return val < this.price
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
)

// Virtuals
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

// Document Middleware: runs before .save() and .create()
// Note: there can be multiple pre and post hooks for the same event
tourSchema.pre<ITourDocument>(/save/, function (this: ITourDocument, next: (error?: CallbackError) => void) {
  this.slug = slugify(this.name, { lower: true })

  next()
})

tourSchema.post<ITourDocument>(
  /post/,
  function (this: ITourDocument, docs: ITourDocument, next: (error?: CallbackError) => void) {
    // console.log(docs)

    next()
  }
)

// Query Middleware
tourSchema.pre(/^find/, function (this: Model<ITourDocument>, next: (error?: CallbackError) => void) {
  void this.find({ secretTour: { $ne: true } }) // this will find all documents that do not have secretTour set to true

  next()
})

tourSchema.post(
  /^find/,
  function (this: Model<ITourDocument>, docs: ITourDocument[], next: (error?: CallbackError) => void) {
    // console.log(docs)

    next()
  }
)

// Aggregation Middleware
tourSchema.pre(/aggregate/, function (this: Model<ITourDocument>, next: (error?: CallbackError) => void) {
  // this.pipeline() returns an array of all the stages in the aggregation pipeline
  // we can add a new stage to the beginning of the pipeline

  next()
})

export const TourModel = model<ITour, TourModelType>('Tour', tourSchema)
