const bcrypt = require("bcryptjs");
const User = require("../models/Users");

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
};
