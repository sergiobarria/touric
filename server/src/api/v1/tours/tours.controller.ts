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
    res: Response
): Promise<Response> => {
    try {
        const newTour = await services.createOne(req.body);

        return res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            data: { tour: newTour },
        });
    } catch (err: any) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: err.message,
        });
    }
};

/**
 * @desc   Get all tours
 * @route  GET /api/v1/tours
 * @access Public
 */
export const getToursHandler: RequestHandler = async (
    req: Request<unknown, unknown, unknown, GetToursInput>,
    res: Response
): Promise<Response> => {
    try {
        const tours = await services.getAll(req.query);

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            results: tours.length,
            data: { tours },
        });
    } catch (err: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};

/**
 * @desc   Get a tour
 * @route  GET /api/v1/tours/:id
 * @access Public
 */
export const getTourHandler = async (req: Request<GetTourInput>, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const tour = await services.getOne(id);

        if (tour === null) {
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
    } catch (err: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};

/**
 * @desc   Update a tour
 * @route  PATCH /api/v1/tours/:id
 * @access Public
 */
export const updateTourHandler = async (
    req: Request<GetTourInput, unknown, UpdateTourInput>,
    res: Response
): Promise<Response> => {
    try {
        const { id } = req.params;

        const updatedTour = await services.updateOne(id, req.body);

        if (updatedTour === null) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                statusCode: httpStatus.NOT_FOUND,
                message: 'Invalid ID',
            });
        }

        return res.status(httpStatus.OK).json({
            success: false,
            statusCode: httpStatus.OK,
            data: { tour: updatedTour },
        });
    } catch (err: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};

/**
 * @desc   Delete a tour
 * @route  DELETE /api/v1/tours/:id
 * @access Public
 */
export const deleteTourHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedTour = await services.deleteOne(id);

        if (deletedTour === null) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                statusCode: httpStatus.NOT_FOUND,
                message: 'Invalid ID',
            });
        }

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Tour deleted successfully',
        });
    } catch (err: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};

/**
 * @desc   Get tours stats
 * @route  PATCH /api/v1/tours/stats
 * @access Public
 */
export const getToursStatsHandler: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const stats = await services.getToursStats();

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            data: { stats },
        });
    } catch (err: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};

/**
 * @desc   Get monthly plan
 * @route  PATCH /api/v1/tours/monthly-plan/:year
 * @access Public
 */
export const getMonthlyPlanHandler = async (req: Request<GetMonthlyPlanInput>, res: Response): Promise<Response> => {
    try {
        const { year } = req.params;
        const plan = await services.getMonthlyPlan(year);

        return res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            results: plan.length,
            data: { plan },
        });
    } catch (err: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};
