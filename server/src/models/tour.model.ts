import mongoose, { type Query } from 'mongoose';
import { round } from 'lodash';
import slugify from 'slugify';
// import validator from 'validator';

export const privateFields = ['__v'];

enum TourDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    DIFFICULT = 'difficult',
}

export interface Tour {
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: TourDifficulty;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount?: number;
    summary: string;
    description?: string;
    imageCover: string;
    images?: string[];
    startDates?: Date[];
    secretTour?: boolean;
}

// interface TourMethods {
//     getTourName: () => string;
// }

const tourSchema = new mongoose.Schema<Tour>(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'A tour name must have less or equal then 40 characters'],
            minlength: [10, 'A tour name must have more or equal then 10 characters'],
            // validate: [validator.isAlpha, 'Tour name must only contain characters']
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration'],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a duration'],
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a duration'],
            enum: {
                values: Object.values(TourDifficulty),
                message: 'Difficulty is either: easy, medium, difficult',
            },
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (this: Tour, val: number) {
                    // this only points to current doc on NEW document creation
                    return val < this.price;
                },
                message: 'Discount price ({VALUE}) should be below regular price',
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a description'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image'],
        },
        images: [String],
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        // versionKey: false,
    }
);

// ===== Virtual Properties =====
tourSchema.virtual('durationWeeks').get(function (this: Tour) {
    const weeks = round(this.duration / 7, 1);
    return weeks;
});

// ===== Document Middleware =====
tourSchema.pre<Tour>('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// ===== Query Middleware =====
tourSchema.pre<Query<Tour, Tour>>(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });

    next();
});

// ===== Aggregation Middleware =====

export const TourModel = mongoose.model<Tour>('Tour', tourSchema);
