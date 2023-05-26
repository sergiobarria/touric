import { type Model, Schema, model, type Query } from 'mongoose';
import slugify from 'slugify';
// import validator from 'validator';

import type { TourType } from '@/api/tours';

export const privateFields = ['__v'];

export type TourDocument = TourType & {
    slug: string;
};

interface TourMethods {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const tourSchema = new Schema<TourDocument, unknown, TourMethods>(
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
                validator: function (this: TourDocument, val: number) {
                    // this only points to current doc on NEW document creation
                    return val < this.price;
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
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function (this: TourDocument) {
    const weeks = Number((this.duration / 7).toFixed(2));

    return weeks;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// add slug to tour document before saving
tourSchema.pre<TourDocument>('save', function (next) {
    this.slug = slugify(this.name, { lower: true });

    next();
});

// QUERY MIDDLEWARE
tourSchema.pre<Query<TourDocument, TourDocument>>(/^find/, function (next) {
    void this.find({ secretTour: { $ne: true } });

    next();
});

// AGGREGATION MIDDLEWARE
// tourSchema.pre<Query<TourDocument, TourDocument>>(/^aggregate/, function (next) {
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//     next();
// });

export const Tour: Model<TourDocument> = model('Tour', tourSchema);
