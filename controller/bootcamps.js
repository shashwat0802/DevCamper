const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamps');

// @desc    get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'get all bootcamps' });
};

// @desc    get single Bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'get single bootcamp' });
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
exports.editBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'edit a bootcamp' });
};

// @desc    delete a Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'delete a bootcamp' });
};
