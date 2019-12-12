const { check, validationResult } = require("express-validator");

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

exports.checkValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
