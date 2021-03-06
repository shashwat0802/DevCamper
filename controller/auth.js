const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    register a user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  // getting token from the method created inside model
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

// @desc    login a user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  // checking if user exists
  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // checking password
  const isMatch = await user.matchPassword(password);

  // if password wrong
  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // getting token from the method created inside model (generate token)
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
