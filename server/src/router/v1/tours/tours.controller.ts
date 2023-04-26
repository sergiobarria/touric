import type { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import type { CreateTourType, GetTourParams, MonthlyPlanParams } from './tours.schemas'
import { APIError } from '@/utils'
import * as services from './tours.services'

export const aliasTopTours = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
})

/**
 * @desc: Create a new tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTourHandler = asyncHandler(
    async (req: Request<any, any, CreateTourType>, res: Response, next: NextFunction) => {
        const tour = await services.createOne(req.body) // passing body directly because it is already validated by zod middleware

        if (tour === null) {
            return next(APIError.internal('tour with the given name already exists'))
        }

        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'tour created successfully',
            data: { tour }
        })
    }
)

/**
 * @desc: Get all tours from the database
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const getToursHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const tours = await services.findMany(req.query)

    res.status(httpStatus.OK).json({
        success: true,
        count: tours.length,
        data: { tours }
    })
})

/**
 * @desc: Get single tour from the database
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export const getTourHandler = asyncHandler(async (req: Request<GetTourParams>, res: Response, next: NextFunction) => {
    const tour = await services.findById(req.params.id)

    if (tour === null) {
        return next(APIError.notFound('tour not found'))
    }

    res.status(httpStatus.OK).json({
        success: true,
        data: { tour }
    })
})

/**
 * @desc: Update a tour
 * @endpoint: PATCH /api/v1/tours/:id
 * @access: Public
 */
export const updateTourHandler = asyncHandler(
    async (req: Request<any, any, Partial<CreateTourType>>, res: Response, next: NextFunction) => {
        const tour = await services.updateOne(req.params.id, req.body)

        if (tour === null) {
            return next(APIError.notFound('tour not found'))
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'tour updated successfully',
            data: { tour }
        })
    }
)

/**
 * @desc: Delete a tour
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export const deleteTourHandler = asyncHandler(
    async (req: Request<GetTourParams>, res: Response, next: NextFunction) => {
        const tour = await services.deleteOne(req.params.id)

        if (tour === null) {
            return next(APIError.notFound('tour not found'))
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'tour deleted successfully',
            data: null
        })
    }
)

/**
 * @desc: Get tour stats
 * @endpoint: GET /api/v1/tours/stats
 * @access: Public
 */
export const getTourStats = asyncHandler(async (_: Request, res: Response, next: NextFunction) => {
    const stats = await services.getTourStats()

    res.status(httpStatus.OK).json({
        success: true,
        data: { stats }
    })
})

/**
 * @desc: Get monthly plan
 * @endpoint: GET /api/v1/tours/monthly-plan
 * @access: Public
 */
export const getMonthlyPlan = asyncHandler(
    async (req: Request<MonthlyPlanParams>, res: Response, next: NextFunction) => {
        const year = Number(req.params.year)

        const plan = await services.getMonthlyPlan(year)

        res.status(httpStatus.OK).json({
            success: true,
            data: { plan }
        })
    }
)
