const Tour = require('../../models/tour.model');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/appError');

// @desc        Get all tours
// @route       GET /api/v1/tours
// @access      Public
exports.getAllTours = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
// async function getAllTours(req, res) {
//   res.status(200).json({ message: 'it works!' });
// }

// @desc        Get tour
// @route       GET /api/v1/tours/:id
// @access      Public
exports.getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// @desc        Create a tour
// @route       POST /api/v1/tours
// @access      Public
exports.createTour = asyncHandler(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

// @desc        Update a tour
// @route       PATCH /api/v1/tours/:id
// @access      Public
exports.updateTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// @desc        Delete a tour
// @route       DELETE /api/v1/tours/:id
// @access      Public
exports.deleteTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});
