import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { omit } from 'lodash'
import asyncHandler from 'express-async-handler'

import { TourModel, tourPrivateFields } from '@/models'
import {
  CreateTourInput,
  DeleteTourInput,
  GetAllToursInput,
  GetTourInput,
  UpdateTourInput
} from '@/modules/tours'
import { QueryFeatures } from '@/shared/features/queryFeatures'
import { AppError } from '@/shared/utils/AppError'

/**
 * @description - Get top tours from the tours collection
 * @access - Public Middleware
 * @routes - GET /api/v1/tours/top-tours
 * */
export const aliasTopTours = (
  req: Request<{}, {}, {}, GetAllToursInput['query']>,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.query.limit = req.query?.limit ?? 3
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
  } catch (error) {
    console.error(error)
  }
}

/**
 * @description - Get all tours from the tours collection
 * @access - Public
 * @routes - GET /api/v1/tours
 * */
export const getAllTours = asyncHandler(
  async (req: Request<{}, {}, {}, GetAllToursInput['query']>, res: Response): Promise<void> => {
    const features = new QueryFeatures(TourModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tours = await features.query

    res.status(httpStatus.OK).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  }
)

/**
 * @description - Create a new tour and save it to the tours collection
 * @access - Public
 * @routes - POST /api/v1/tours
 * */
export const createTour = asyncHandler(
  async (req: Request<{}, {}, CreateTourInput['body']>, res: Response): Promise<void> => {
    const tour = await TourModel.create(req.body)

    if (tour === null) {
      throw new AppError('Tour not created', httpStatus.BAD_REQUEST)
    }

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        tour
      }
    })
  }
)

/**
 * @description - Get a single tour from the tours collection
 * @access - Public
 * @routes - GET /api/v1/tours/:id
 * */
export const getTour = asyncHandler(
  async (req: Request<GetTourInput['params']>, res: Response): Promise<void> => {
    const { id } = req.params

    const tour = await TourModel.findById(id)

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        tour: omit(tour?.toJSON(), tourPrivateFields)
      }
    })
  }
)

/**
 * @description - Update a tour from the tours collection
 * @access - Public
 * @routes - PATCH /api/v1/tours/:id
 * */
export const updateTour = asyncHandler(
  async (req: Request<UpdateTourInput['params']>, res: Response): Promise<void> => {
    const { id } = req.params

    const tour = await TourModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        tour: omit(tour?.toJSON(), tourPrivateFields)
      }
    })
  }
)

/**
 * @description - Delete a tour from the tours collection
 * @access - Public
 * @routes - DELETE /api/v1/tours/:id
 * */
export const deleteTour = asyncHandler(
  async (req: Request<DeleteTourInput['params']>, res: Response): Promise<void> => {
    const { id } = req.params

    await TourModel.findByIdAndDelete(id)

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null
    })
  }
)

/**
 * @description - Get tour stats
 * @access - Public
 * @routes - GET /api/v1/tours/tour-stats
 * */
export const getTourStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const stats = await TourModel.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ])

  res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      stats
    }
  })
})

/**
 * @description - Get monthly plan
 * @access - Public
 * @routes - GET /api/v1/tours/:id
 * */
export const getMonthlyPlan = asyncHandler(
  async (req: Request<GetTourInput['params']>, res: Response): Promise<void> => {
    const year = Number(req.params.year)

    const plan = await TourModel.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ])

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        plan
      }
    })
  }
)
