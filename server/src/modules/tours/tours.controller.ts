import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { omit } from 'lodash'

import { TourModel, tourPrivateFields } from '@/models'
import { CreateTourInput, DeleteTourInput, GetTourInput, UpdateTourInput } from '@/modules/tours'

/**
 * @description - Get all tours from the tours collection
 * @access - Public
 * @routes - GET /api/v1/tours
 * */
export const getAllTours = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tours = await TourModel.find()

    return res.status(httpStatus.OK).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (err: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: err.message
    })
  }
}

/**
 * @description - Create a new tour and save it to the tours collection
 * @access - Public
 * @routes - POST /api/v1/tours
 * */
export const createTour = async (
  req: Request<{}, {}, CreateTourInput['body']>,
  res: Response
): Promise<Response> => {
  try {
    const tour = await TourModel.create(req.body)

    return res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        tour: omit(tour.toJSON(), tourPrivateFields)
      }
    })
  } catch (err: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: err.message
    })
  }
}

/**
 * @description - Get a single tour from the tours collection
 * @access - Public
 * @routes - GET /api/v1/tours/:id
 * */
export const getTour = async (
  req: Request<GetTourInput['params']>,
  res: Response
): Promise<Response> => {
  const { id } = req.params

  const tour = await TourModel.findById(id)

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      tour: omit(tour?.toJSON(), tourPrivateFields)
    }
  })
}

/**
 * @description - Update a tour from the tours collection
 * @access - Public
 * @routes - PATCH /api/v1/tours/:id
 * */
export const updateTour = async (
  req: Request<UpdateTourInput['params']>,
  res: Response
): Promise<Response> => {
  const { id } = req.params

  const tour = await TourModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      tour: omit(tour?.toJSON(), tourPrivateFields)
    }
  })
}

/**
 * @description - Delete a tour from the tours collection
 * @access - Public
 * @routes - DELETE /api/v1/tours/:id
 * */
export const deleteTour = async (
  req: Request<DeleteTourInput['params']>,
  res: Response
): Promise<Response> => {
  const { id } = req.params

  await TourModel.findByIdAndDelete(id)

  return res.status(httpStatus.NO_CONTENT).json({
    status: 'success',
    data: null
  })
}
