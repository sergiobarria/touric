import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import httpStatus from 'http-status';
import { omit } from 'lodash';

import { TourModel, privateFields } from '@/models';
import { APIError } from '@/shared/utils/apiError';

/**
 * @desc   Get all tours
 * @route  GET /api/v1/tours
 * @access Public
 */
export const getTours = asyncHandler(async (req: Request, res: Response) => {
  const tours = await TourModel.find();

  res.status(httpStatus.OK).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

/**
 * @desc   Get a single tour
 * @route  GET /api/v1/tours/:id
 * @access Public
 */
export const getTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const tour = await TourModel.findById(id);

    if (!tour) {
      return next(
        new APIError(`No tour found with id ${id}`, httpStatus.NOT_FOUND)
      );
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: { tour: omit(tour.toObject(), privateFields) },
    });
  }
);

/**
 * @desc   Create a tour
 * @route  POST /api/v1/tours
 * @access Private
 */
export const createTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await TourModel.create(req.body);

    if (!tour) {
      return next(new APIError(`Error creating tour`, httpStatus.NOT_FOUND));
    }

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: { tour },
    });
  }
);

/**
 * @desc   Update a tour
 * @route  PATCH /api/v1/tours/:id
 * @access Private
 */
export const updateTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const tour = await TourModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return next(
        new APIError(`No tour found with id ${id}`, httpStatus.NOT_FOUND)
      );
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: { tour: omit(tour.toObject(), privateFields) },
    });
  }
);

/**
 * @desc   Delete a tour
 * @route  DELETE /api/v1/tours/:id
 * @access Private
 */
export const deleteTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const tour = await TourModel.findByIdAndDelete(id);

    if (!tour) {
      return next(
        new APIError(`No tour found with id ${id}`, httpStatus.NOT_FOUND)
      );
    }

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  }
);
