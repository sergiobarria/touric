import mongoose from 'mongoose';

export const privateFields = ['__v'];

enum TourDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    DIFFICULT = 'difficult',
}

export interface Tour {
    name: string;
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
}

interface TourMethods {
    getTourName: () => string;
}

const tourSchema = new mongoose.Schema<Tour, unknown, TourMethods>(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
        },
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
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
        priceDiscount: Number,
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
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        // versionKey: false,
    }
);

export const TourModel = mongoose.model<Tour>('Tour', tourSchema);
