import * as fs from 'fs'
import * as path from 'path'

import { Request, Response } from 'express'
import httpStatus from 'http-status'
import {
  CreateTourInput,
  DeleteTourInput,
  GetTourInput,
  UpdateTourInput
} from '@/modules/tours/tours.schema'

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/../../../dev-data/data/tours-simple.json'), 'utf-8')
)

/**
 * @description - Get all tours from the tours collection
 * @access - Public
 * @routes - GET /api/v1/tours
 * */
export const getAllTours = (req: Request, res: Response): Response => {
  return res.status(httpStatus.OK).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

/**
 * @description - Create a new tour and save it to the tours colletion
 * @access - Public
 * @routes - POST /api/v1/tours
 * */
export const createTour = (
  req: Request<{}, {}, CreateTourInput['body']>,
  res: Response
): Response => {
  const newId = Number(tours[tours.length - 1].id) + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    path.join(__dirname, '/../../../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    () => {
      return res.status(httpStatus.CREATED).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }
  )

  return res.status(httpStatus.CREATED).json({
    status: 'success',
    data: {
      tour: newTour
    }
  })
}

/**
 * @description - Get a single tour from the tours collection
 * @access - Public
 * @routes - GET /api/v1/tours/:id
 * */
export const getTour = (req: Request<GetTourInput['params']>, res: Response): Response => {
  const { id } = req.params

  const tour = tours.find((el: { id: number }) => el.id === Number(id))

  if (tour !== undefined) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      tour
    }
  })
}

/**
 * @description - Update a tour from the tours collection
 * @access - Public
 * @routes - PATCH /api/v1/tours/:id
 * */
export const updateTour = (req: Request<UpdateTourInput['params']>, res: Response): Response => {
  const { id } = req.params

  const tour = tours.find((el: { id: number }) => el.id === +id)

  if (tour !== undefined) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  })
}

/**
 * @description - Delete a tour from the tours collection
 * @access - Public
 * @routes - DELETE /api/v1/tours/:id
 * */
export const deleteTour = (req: Request<DeleteTourInput['params']>, res: Response): Response => {
  return res.status(httpStatus.NO_CONTENT).json({
    status: 'success',
    data: null
  })
}
