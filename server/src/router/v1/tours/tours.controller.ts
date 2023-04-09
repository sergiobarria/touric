import type { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

import type { CreateTourType, GetTourParams } from './tours.schemas'
import * as services from './tours.services'

/**
 * @desc: Create a new tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTourHandler = asyncHandler(
    async (req: Request<any, any, CreateTourType>, res: Response, next: NextFunction) => {
        const tour = await services.createOne(req.body) // passing body directly because it is already validated by zod middleware

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
    const tours = await services.findMany()

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

    // if (!tour) {
    //     return next(new Error(`Tour with id: ${req.params.id} not found`))
    // }

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
        await services.deleteOne(req.params.id)

        res.status(httpStatus.OK).json({
            success: true,
            message: 'tour deleted successfully',
            data: null
        })
    }
)
