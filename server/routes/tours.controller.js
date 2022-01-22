const fs = require('fs');

// read tours data from local folder
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// @desc        Get all tours
// @route       GET /api/v1/tours
// @access      Public
function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

// @desc        Get tour
// @route       GET /api/v1/tours/:id
// @access      Public
function getTour(req, res) {
  const id = Number(req.params.id);

  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      tour,
    },
  });
}

// @desc        Create a tour
// @route       POST /api/v1/tours
// @access      Public
function createTour(req, res) {
  const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}

// @desc        Update a tour
// @route       PATCH /api/v1/tours/:id
// @access      Public
function updateTour(req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
}

// @desc        Delete a tour
// @route       DELETE /api/v1/tours/:id
// @access      Public
function deleteTour(req, res) {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
