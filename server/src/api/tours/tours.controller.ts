import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as services from './tours.services';
import type { CreateTourInput, GetMonthlyPlanParams, GetTourParams, UpdateTourInput } from '@/api/tours/tours.schemas';
import { APIError } from '@/lib';

/**
 * @desc: Get top five tours
 * @endpoint: GET /api/v1/tours/top-five
 * @access: Public
 */
export async function aliasTopTours(req: Request, _: Response, next: NextFunction): Promise<void> {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

    next();
}

/**
 * @desc: Create a new tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export async function createTour(
    req: Request<unknown, unknown, CreateTourInput>,
    res: Response,
    next: NextFunction
): Promise<void> {
    const tour = await services.createOne(req.body);

    if (tour === undefined) {
        return next(APIError.badRequest('Unable to create tour'));
    }

    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'tour created successfully',
        data: tour
    });
}

/**
 * @desc: Get all tours
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export async function getTours(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const tours = await services.getAll(req.query);

    return res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tours fetched successfully',
        results: tours.length,
        data: { tours }
    });
}

/**
 * @desc: Get single tour by id
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export async function getTour(req: Request<GetTourParams>, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const tour = await services.getOne(id);

    if (tour === null) {
        return next(APIError.notFound('tour not found'));
    }

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour fetched successfully',
        data: { tour }
    });
}

/**
 * @desc: Update single tour by id
 * @endpoint: PATCH /api/v1/tours/:id
 * @access: Public
 */
export async function updateTour(
    req: Request<GetTourParams, unknown, UpdateTourInput>,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const tour = await services.updateOne(id, req.body);

    if (tour === null) {
        return next(APIError.notFound('tour not found'));
    }

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour updated successfully',
        data: { tour }
    });
}

/**
 * @desc: Delete single tour by id
 * @endpoint: DELETE /api/v1/tours/:id
 * @access: Public
 */
export async function deleteTour(req: Request<GetTourParams>, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const tour = await services.deleteOne(id);

    if (tour === null) {
        return next(APIError.notFound('tour not found'));
    }

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour deleted successfully',
        data: null
    });
}

/**
 * @desc: Get tours stats by difficulty
 * @endpoint: DELETE /api/v1/tours/stats
 * @access: Public
 */
export async function tourStats(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const stats = await services.getTourStats();

    return res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour stats fetched successfully',
        data: { stats }
    });
}

/**
 * @desc: Get monthly plan of tours by year
 * @endpoint: DELETE /api/v1/tours/monthly-plan/:year
 * @access: Public
 */
export async function monthlyPlan(
    req: Request<GetMonthlyPlanParams>,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const { year } = req.params;
    const plan = await services.getMonthlyPlan(year);

    return res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour monthly plan fetched successfully',
        data: { plan }
    });
}
