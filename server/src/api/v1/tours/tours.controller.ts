import fs from 'fs';
import path from 'path';

import type { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../dev-data/data/tours-simple.json'), 'utf-8'));

/**
 * @desc   Create a new tour
 * @route  POST /api/v1/tours
 * @access Public
 */
export const createTourHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const newId = Number(tours[tours.length - 1].id) + 1;
    const newTour = { id: newId, ...req.body };

    tours.push(newTour);

    fs.writeFile(path.join(__dirname, '../../../../dev-data/data/tours-simple.json'), JSON.stringify(tours), err => {
        if (err !== null) {
            console.error(err);
        }

        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            data: { tour: newTour },
        });
    });
};

/**
 * @desc   Get all tours
 * @route  GET /api/v1/tours
 * @access Public
 */
export const getToursHandler: RequestHandler = async (_: Request, res: Response): Promise<void> => {
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        results: tours.length,
        data: { tours },
    });
};

/**
 * @desc   Get a tour
 * @route  GET /api/v1/tours/:id
 * @access Public
 */
export const getTourHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const tour = tours.find((tour: any) => tour.id === Number(id));

    if (tour === undefined) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Invalid ID',
            data: null,
        });
    }

    return res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        data: { tour },
    });
};

/**
 * @desc   Update a tour
 * @route  PATCH /api/v1/tours/:id
 * @access Public
 */
export const updateTourHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (Number(id) > tours.length) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Invalid ID',
        });
    }

    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};

/**
 * @desc   Delete a tour
 * @route  DELETE /api/v1/tours/:id
 * @access Public
 */
export const deleteTourHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (Number(id) > tours.length) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Invalid ID',
        });
    }

    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'This route is not yet implemented',
    });
};
