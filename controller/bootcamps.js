const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamps');

// @desc    get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamp.length, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, msg: `${err.message}` });
  }
};

// @desc    get single Bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, msg: 'bootcamp not found , invalid ID' });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.status(400).json({ success: false, msg: `${err.message}` });
    next(err);
  }
};

// @desc    create a Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, msg: `${err.message}` });
  }
};

// @desc    edit a Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.editBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, msg: 'bootcamp not found , invalid ID' });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, msg: `${err.message}` });
  }
};

// @desc    delete a Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, msg: 'bootcamp not found , invalid ID' });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, msg: `${err.message}` });
  }
};
