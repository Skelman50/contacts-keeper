const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const config = require("config");
const ErrorResponse = require("../utils/error-response");

exports.authMdw = asyncHandler((req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return next(new ErrorResponse("No token", 401));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    return next(new ErrorResponse("No token", 401));
  }
});
