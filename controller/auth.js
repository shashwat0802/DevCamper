const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    register a user
// @route   GET /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  await User.create({
    name,
    email,
    password,
    role,
  });
  res.status(200).json({ success: true, data: 'register a user' });
});
