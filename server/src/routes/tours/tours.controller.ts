import * as fs from 'fs'
import * as path from 'path'

import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import {
  CreateTourInputType,
  DeleteTourParamsType,
  GetTourType,
  UpdateTourBodyType,
  UpdateTourParamsType
} from './tours.schemas'

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../../dev-data/data/tours-simple.json'), 'utf8')
)

/**
 * @desc: Get all tours
 * @endpoint: GET /api/v1/tours
 * @access: Public
 */
export const getTours = asyncHandler(async (req: Request, res: Response) => {
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
  async (req: Request<GetTourType>, res: Response): Promise<any> => {
    const { id } = req.params
    const tour = tours.find((t: any) => t.id === parseInt(id, 10))

    if (tour === null) {
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
)

/**
 * @desc: Create tour
 * @endpoint: POST /api/v1/tours
 * @access: Public
 */
export const createTour = asyncHandler(
  async (req: Request<unknown, unknown, CreateTourInputType>, res: Response) => {
    const tourData = req.body

    // eslint-disable-next-line
    const newId = tours[tours.length - 1].id + 1
    const newTour = { id: newId, ...tourData }
    tours.push(newTour)

    // NOTE: This is a hack to make the code work with the current implementation
    // of the API. In the future, we will use a database to store the data.
    fs.writeFile(
      path.join(__dirname, '../../../dev-data/data/tours-simple.json'),
      JSON.stringify(tours),
      (err: any) => {
        if (err !== null) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'fail',
            message: 'Error writing file'
          })
        }

        return res.status(httpStatus.CREATED).json({
          status: 'success',
          data: {
            tour: newTour
          }
        })
      }
    )
  }
)

/**
 * @desc: Update tour
 * @endpoint: PATCH /api/v1/tours/:id
 * @access: Public
 */
export const updateTour = asyncHandler(
  async (req: Request<UpdateTourParamsType, unknown, UpdateTourBodyType>, res: Response) => {
    const { id } = req.params
    const tourData = req.body

    res.status(httpStatus.NOT_IMPLEMENTED).json({
      status: 'fail',
      message: 'This route is not yet defined',
      data: {
        id,
        tourData,
        tour: '<Updated tour here...>'
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
  async (req: Request<DeleteTourParamsType>, res: Response) => {
    const { id } = req.params

    res.status(httpStatus.NOT_IMPLEMENTED).json({
      status: 'fail',
      message: 'This route is not yet defined',
      data: {
        id,
        tour: '<Deleted tour here...>'
      }
    })
  }
)
