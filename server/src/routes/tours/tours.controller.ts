import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import httpStatus from 'http-status';

/**
 * @desc   Get all tours
 * @route  GET /api/v1/tours
 * @access Public
 */
export const getTours = asyncHandler(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: 'tours' });
});

/**
 * @desc   Get a single tour
 * @route  GET /api/v1/tours/:id
 * @access Public
 */
export const getTour = asyncHandler(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: 'tour' });
});

/**
 * @desc   Create a tour
 * @route  POST /api/v1/tours
 * @access Private
 */
export const createTour = asyncHandler(async (req: Request, res: Response) => {
  res.status(httpStatus.CREATED).json({ status: 'tour created' });
});

/**
 * @desc   Update a tour
 * @route  PATCH /api/v1/tours/:id
 * @access Private
 */
export const updateTour = asyncHandler(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: 'tour updated' });
});

/**
 * @desc   Delete a tour
 * @route  DELETE /api/v1/tours/:id
 * @access Private
 */
export const deleteTour = asyncHandler(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: 'tour deleted' });
});
