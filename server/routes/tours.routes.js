const express = require('express');

const { getAllTours } = require('./tours.controller');

const router = express.Router();

router.route('/').get(getAllTours);

module.exports = router;
