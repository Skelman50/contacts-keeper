const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/error-response");
const User = require("../models/Users");
const { getSighn } = require("../services/auth");

//@route    POST api/auth
//@desc     auth user and get token
//@access   Public
exports.authenticate = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("User Not found", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return next(new ErrorResponse("Invalid password", 400));
  }
  const token = await getSighn(user);
  res.json({ token });
});

//@route    GET api/auth
//@desc     logged a user
//@access   Private
exports.loggedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.json(user);
});
