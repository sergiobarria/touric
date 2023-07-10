import mongoose from 'mongoose';

interface Tour {
    name: string;
    rating: number;
    price: number;
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
        },
        rating: {
            type: Number,
            required: [true, 'A tour must have a duration'],
            default: 4.5,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        // versionKey: false,
    }
);

export const TourModel = mongoose.model<Tour>('Tour', tourSchema);
