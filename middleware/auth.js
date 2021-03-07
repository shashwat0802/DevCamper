const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/Users');
const asyncHandler = require('./async');

// middleware that will run before controllers that needs to be protected
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if (req.cookies.token){
  //     token = req.cookies.token;
  // }

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    // verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);

    req.user = await User.findById(decode.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});

// authorize access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
