import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'

import {
  CreateTourInputType,
  DeleteTourParamsType,
  GetToursQueryType,
  GetTourParamsType,
  UpdateTourBodyType,
  UpdateTourParamsType
} from './tours.schemas'
import { ITourDocument, TourModel } from '@/models/tours.model'

import { APIFeatures } from '@/shared/features/apiFeatures'
import { APIError } from '@/shared/utils/apiError'

/**
 * @desc: Get top 5 tours by ratings (middleware)
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const aliasTopTours = asyncHandler(
  async (req: Request<{}, {}, {}, GetToursQueryType>, _: Response, next: NextFunction) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
  }
)

/**
 * @desc: Get all tours
 * @endpoint: GET /api/v1/tours
 * @access: Private
 */
export const getTours = asyncHandler(async (req: Request<{}, {}, {}, GetToursQueryType>, res: Response) => {
  const features = new APIFeatures<ITourDocument>(TourModel.find(), req.query).filter().sort().limitFields().paginate()

  const tours = await features.query

  res.status(httpStatus.OK).json({
    status: 'success',
    count: tours.length,
    data: {
      tours
    }
  })
})

/**
 * @desc: Get tour
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export const getTour = asyncHandler(
  async (req: Request<GetTourParamsType>, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params
    const tour = await TourModel.findById(id).select('-__v')

    if (tour === null) {
      return next(APIError.notFound(`Tour with id ${id} not found`))
    }

    return res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        tour
      }
    })
  }
)

/**
 * @desc: Create tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTour = asyncHandler(async (req: Request<{}, {}, CreateTourInputType>, res: Response) => {
  const tourData = req.body

  const newTour = await TourModel.create(tourData)

  res.status(httpStatus.CREATED).json({
    status: 'success',
    data: { tour: newTour }
  })
})

/**
 * @desc: Update tour
 * @endpoint: PATCH /api/v1/tours/:id
 * @access: Public
 */
export const updateTour = asyncHandler(
  async (req: Request<UpdateTourParamsType, {}, UpdateTourBodyType>, res: Response, next: NextFunction) => {
    const { id } = req.params
    const tourData = req.body

    const updatedTour = await TourModel.findByIdAndUpdate(id, tourData, {
      new: true,
      runValidators: true
    })

    if (updatedTour === null) {
      return next(APIError.notFound(`Tour with id ${id} not found`))
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })
  }
)

/**
 * @desc: Delete tour
 * @endpoint: DELETE /api/v1/tours/:id
 * @access: Public
 */
export const deleteTour = asyncHandler(
  async (req: Request<DeleteTourParamsType>, res: Response, next: NextFunction) => {
    const { id } = req.params

    const tour = await TourModel.findByIdAndDelete(id)

    if (tour === null) {
      return next(APIError.notFound(`Tour with id ${id} not found`))
    }

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null
    })
  }
)

/**
 * @desc: Get tours stats
 * @endpoint: GET /api/v1/tours/tour-stats
 * @access: Public
 * @note: This is an aggregation pipeline
 */
export const getTourStats = asyncHandler(async (_: Request, res: Response) => {
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
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ])

  res.status(httpStatus.OK).json({
    status: 'success',
    data: { stats }
  })
})

/**
 * @desc: Get monthly plan
 * @endpoint: GET /api/v1/tours/monthly-plan/:year
 * @access: Public
 * @note: This is an aggregation pipeline
 * @note: This is a sample of how to use $unwind and $group
 */
export const getMonthlyPlan = asyncHandler(async (req: Request<{ year: string }>, res: Response) => {
  const year = parseInt(req.params?.year, 10)

  const plan = await TourModel.aggregate([
    {
      $unwind: '$startDates' // Unwind the array of startDates
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
      $project: { _id: 0 }
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
    results: plan.length,
    data: { plan }
  })
})
