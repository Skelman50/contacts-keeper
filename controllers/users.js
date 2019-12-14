const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/error-response");
const { getSighn } = require("../services/auth");

//@route    POST api/users
//@desc     register a user
//@access   Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    return next(new ErrorResponse("User already exists", 400));
  }
  const user = new User({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  const token = await getSighn(user);
  res.json({ token });
});
