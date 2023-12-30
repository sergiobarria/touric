import { Difficulty } from '@prisma/client';
import { IsString, Min, Max, IsEnum, IsOptional, IsPositive, IsArray } from 'class-validator';

export class CreateTourDto {
    @IsString({ message: 'name must be a string' })
    name: string;

    @Min(1, { message: 'duration must be greater than 0' })
    @Max(7, { message: 'duration must be less than 7' })
    duration: number;

    @Min(1, { message: 'maxGroupSize must be greater than 0' })
    @Max(30, { message: 'maxGroupSize must be less than 30' })
    maxGroupSize: number;

    @IsEnum(['EASY', 'MEDIUM', 'DIFFICULT'], {
        message: 'difficulty must be either: EASY, MEDIUM, or DIFFICULT',
    })
    difficulty: Difficulty;

    @Min(1, { message: 'ratingsAvg must be greater than 0' })
    @Max(5, { message: 'ratingsAvg must be less than 5' })
    ratingsAvg: number;

    @Min(1, { message: 'ratingsQty must be greater than 0' })
    ratingsQty: number;

    @IsPositive({ message: 'price must be a positive number' })
    price: number;

    @IsOptional()
    @IsPositive({ message: 'priceDiscount must be a positive number' })
    priceDiscount?: number;

    @IsString({ message: 'summary must be a string' })
    summary: string;

    @IsOptional()
    @IsString({ message: 'description must be a string' })
    description: string;

    @IsString({ message: 'imageCover must be a string' })
    imageCover: string;

    @IsArray({ message: 'images must be an array' })
    @IsString({ each: true, message: 'images must be an array of strings' })
    images: string[];

    @IsArray({ message: 'startDates must be an array' })
    @IsString({ each: true, message: 'startDates must be an array of strings' })
    startDates: Date[];
}
