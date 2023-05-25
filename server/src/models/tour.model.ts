import { type Model, Schema, model } from 'mongoose';

export const privateFields = ['__v'];

export interface TourDocument {
    name: string;
    rating: number;
    price: number;
}

interface TourMethods {
    comparePassword: (password: string) => Promise<boolean>;
}

const tourSchema = new Schema<TourDocument, unknown, TourMethods>(
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
        timestamps: true,
        versionKey: false
    }
);

export const Tour: Model<TourDocument> = model('Tour', tourSchema);
