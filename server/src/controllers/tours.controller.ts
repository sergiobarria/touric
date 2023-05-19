import * as path from 'path';
import * as fs from 'fs';

import type { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'dev-data/data', 'tours-simple.json'), 'utf-8'));

/**
 * @desc: Create a new tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTour: RequestHandler = async (req: Request, res: Response) => {
    const newId = Number(tours[tours.length - 1].id) + 1;
    const newTour = { id: newId, ...req.body };

    tours.push(newTour);
    fs.writeFile(path.join(__dirname, '../..', 'dev-data/data', 'tours-simple.json'), JSON.stringify(tours), _ => {
        return res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'Tour created successfully',
            data: {
                tour: newTour
            }
        });
    });
};

/**
 * @desc: Get all tours
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const getTours: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tours fetched successfully',
        results: tours.length,
        data: { tours }
    });
};

/**
 * @desc: Get single tour by id
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export const getTour: RequestHandler = async (req: Request, res: Response) => {
    const tourId = Number(req.params.id);
    const tour = tours.find((tour: any) => tour.id === tourId);

    if (tour === undefined) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'tour not found',
            data: null
        });
    }

    return res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour fetched successfully',
        data: { tour }
    });
};

/**
 * @desc: Update single tour by id
 * @endpoint: PATCH /api/v1/tours/:id
 * @access: Public
 */
export const updateTour: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};

/**
 * @desc: Delete single tour by id
 * @endpoint: DELETE /api/v1/tours/:id
 * @access: Public
 */
export const deleteTour: RequestHandler = async (req: Request, res: Response) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: true,
        statusCode: httpStatus.NOT_IMPLEMENTED,
        message: 'route not implemented',
        data: null
    });
};
