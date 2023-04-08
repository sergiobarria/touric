import * as fs from 'fs'
import * as path from 'path'

import type { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import asyncHandler from 'express-async-handler'

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../dev-data/data/tours-simple.json'), 'utf-8'))

/**
 * @desc: Create a new tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTourHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.CREATED).json({
        success: true,
        message: 'tour created successfully',
        data: null
    })
})

/**
 * @desc: Get all tours from the database
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const getToursHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
export const getTourHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const tour = tours.find((tour: any) => tour.id === Number(req.params.id))

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
export const updateTourHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'tour updated successfully',
        data: null
    })
})

/**
 * @desc: Delete a tour
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export const deleteTourHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'tour deleted successfully',
        data: null
    })
})
