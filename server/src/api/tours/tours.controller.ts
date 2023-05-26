import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as services from './tours.services';
import type { CreateTourInput, GetMonthlyPlanParams, GetTourParams, UpdateTourInput } from '@/api/tours/tours.schemas';

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
export async function createTour(req: Request<unknown, unknown, CreateTourInput>, res: Response): Promise<Response> {
    try {
        const tour = await services.createOne(req.body);

        return res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'tour created successfully',
            data: tour
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Invalid data sent'
        });
    }
}

/**
 * @desc: Get all tours
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export async function getTours(req: Request, res: Response): Promise<Response> {
    try {
        const tours = await services.getAll(req.query);

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'tours fetched successfully',
            results: tours.length,
            data: { tours }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'something went wrong'
        });
    }
}

/**
 * @desc: Get single tour by id
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export async function getTour(req: Request<GetTourParams>, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const tour = await services.getOne(id);

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'tour fetched successfully',
            data: { tour }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong'
        });
    }
}

/**
 * @desc: Update single tour by id
 * @endpoint: PATCH /api/v1/tours/:id
 * @access: Public
 */
export async function updateTour(
    req: Request<GetTourParams, unknown, UpdateTourInput>,
    res: Response
): Promise<Response> {
    try {
        const { id } = req.params;
        const tour = await services.updateOne(id, req.body);

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'tour updated successfully',
            data: { tour }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong'
        });
    }
}

/**
 * @desc: Delete single tour by id
 * @endpoint: DELETE /api/v1/tours/:id
 * @access: Public
 */
export async function deleteTour(req: Request<GetTourParams>, res: Response): Promise<Response> {
    const { id } = req.params;

    await services.deleteOne(id);

    return res.status(httpStatus.OK).json({
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
export async function getTourStats(req: Request, res: Response): Promise<Response> {
    try {
        const stats = await services.getTourStats();

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'tour stats fetched successfully',
            data: { stats }
        });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong'
        });
    }
}

/**
 * @desc: Get monthly plan of tours by year
 * @endpoint: DELETE /api/v1/tours/monthly-plan/:year
 * @access: Public
 */
export async function getMonthlyPlan(req: Request<GetMonthlyPlanParams>, res: Response): Promise<Response> {
    try {
        const { year } = req.params;
        const plan = await services.getMonthlyPlan(year);

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'tour monthly plan fetched successfully',
            data: { plan }
        });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong'
        });
    }
}
