const { check, validationResult } = require("express-validator");
const ErrorResponse = require("../utils/error-response");

exports.register = [
  check("name", "Please add a name")
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password min 6 characters").isLength({
    min: 6
  })
];

exports.auth = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists()
];

exports.addNewContactCheck = [
  check("name", "Name is required")
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").isEmail()
];

exports.checkValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(err => err.msg)[0];
    return next(new ErrorResponse(msg, 400));
  }
  next();
};
