const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamps');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Create copy of req.query
  const reqQuery = { ...req.query };

  // Feilds to exclude
  const removeFeilds = ['select', 'sort', 'pageNo', 'pageSize'];

  // Loop over removeFeilds and exclude the from reqQuery
  removeFeilds.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create Operators like $gt etc
  queryStr = queryStr.replace(
    /\b'gt|gte|lt|lte|in'\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Feild
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const pageNo = parseInt(req.query.pageNo, 10) || 1;

  const pageSize = parseInt(req.query.pageSize, 10) || 25;

  const startIndex = (pageNo - 1) * pageSize;

  const endIndex = pageNo * pageSize;

  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(pageSize);

  // Execute Query
  const bootcamp = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      pageNo: pageNo + 1,
      pageSize,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      pageNo: pageNo - 1,
      pageSize,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamp.length,
    pagination,
    data: bootcamp,
  });
});

// @desc    get single Bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(err);
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    create a Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc    edit a Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.editBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(err);
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    delete a Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(err);
  }

  bootcamp.remove();
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get longitude/ latitude from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calculate radius in radians
  // Divide by earth radius
  // 6378 in km / 3963 in miles

  const radius = distance / 3963;

  const bootcamp = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
});
