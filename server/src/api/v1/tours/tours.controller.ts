import type { Request, Response, RequestHandler, NextFunction } from 'express';
import httpStatus from 'http-status';

import type {
    CreateTourInput,
    GetToursInput,
    GetTourInput,
    UpdateTourInput,
    GetMonthlyPlanInput,
} from './tours.schemas';
import * as services from './tours.services';
import { APIError } from '@/utils';

/**
 * @desc   Get top 5 tours
 * @route  GET /api/v1/tours
 * @access Public
 */
export const aliasTopTours = (req: Request, res: Response, next: NextFunction): void => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

    next();
};

/**
 * @desc   Create a new tour
 * @route  POST /api/v1/tours
 * @access Public
 */
export const createTourHandler: RequestHandler = async (
    req: Request<unknown, unknown, CreateTourInput>,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const newTour = await services.createOne(req.body);

    return res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        data: { tour: newTour },
    });
};

/**
 * @desc   Get all tours
 * @route  GET /api/v1/tours
 * @access Public
 */
export const getToursHandler: RequestHandler = async (
    req: Request<unknown, unknown, unknown, GetToursInput>,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const tours = await services.getAll(req.query);

    return res.status(httpStatus.OK).json({
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
export const getTourHandler = async (req: Request<GetTourInput>, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const tour = await services.getOne(id);

    if (!tour) return next(APIError.notFound('tour not found'));

    res.status(httpStatus.OK).json({
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
export const updateTourHandler = async (
    req: Request<GetTourInput, unknown, UpdateTourInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;

    const updatedTour = await services.updateOne(id, req.body);

    if (!updatedTour) return next(APIError.notFound('tour not found'));

    res.status(httpStatus.OK).json({
        success: false,
        statusCode: httpStatus.OK,
        data: { tour: updatedTour },
    });
};

/**
 * @desc   Delete a tour
 * @route  DELETE /api/v1/tours/:id
 * @access Public
 */
export const deleteTourHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;
    const deletedTour = await services.deleteOne(id);

    if (!deletedTour) return next(APIError.notFound('tour not found'));

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'tour deleted successfully',
    });
};

/**
 * @desc   Get tours stats
 * @route  PATCH /api/v1/tours/stats
 * @access Public
 */
export const getToursStatsHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const stats = await services.getToursStats();

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        data: { stats },
    });
};

/**
 * @desc   Get monthly plan
 * @route  PATCH /api/v1/tours/monthly-plan/:year
 * @access Public
 */
export const getMonthlyPlanHandler = async (
    req: Request<GetMonthlyPlanInput>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { year } = req.params;
    const plan = await services.getMonthlyPlan(year);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        results: plan.length,
        data: { plan },
    });
};
