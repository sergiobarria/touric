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
import { ITour, TourModel } from '@/models/tours.model'

import { APIFeatures } from '@/shared/features/apiFeatures'
import { Document } from 'mongoose'

/**
 * @desc: Get top 5 tours by ratings (middleware)
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const aliasTopTours = asyncHandler(
  async (req: Request<unknown, unknown, unknown, GetToursQueryType>, _: Response, next: NextFunction) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
  }
)

/**
 * @desc: Get all tours
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const getTours = asyncHandler(
  async (req: Request<unknown, unknown, unknown, GetToursQueryType>, res: Response) => {
    const features = new APIFeatures<ITour & Document>(TourModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const tours = await features.query

    res.status(httpStatus.OK).json({
      status: 'success',
      count: tours.length,
      data: {
        tours
      }
    })
  }
)

/**
 * @desc: Get tour
 * @endpoint: GET /api/v1/tours/:id
 * @access: Public
 */
export const getTour = asyncHandler(async (req: Request<GetTourParamsType>, res: Response): Promise<any> => {
  const { id } = req.params
  const tour = await TourModel.findById(id).select('-__v')

  if (tour === null) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Tour not found'
    })
  }

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      tour
    }
  })
})

/**
 * @desc: Create tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTour = asyncHandler(async (req: Request<unknown, unknown, CreateTourInputType>, res: Response) => {
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
  async (req: Request<UpdateTourParamsType, unknown, UpdateTourBodyType>, res: Response) => {
    const { id } = req.params
    const tourData = req.body

    const updatedTour = await TourModel.findByIdAndUpdate(id, tourData, {
      new: true,
      runValidators: true
    })

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
export const deleteTour = asyncHandler(async (req: Request<DeleteTourParamsType>, res: Response) => {
  const { id } = req.params

  await TourModel.findByIdAndDelete(id)

  res.status(httpStatus.NO_CONTENT).json({
    status: 'success',
    data: null
  })
})
