const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const { getSighn } = require("../services/auth");

//@route    POST api/auth
//@desc     auth user and get token
//@access   Public
exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    const token = await getSighn(user);
    res.json({ token });
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).json({ msg: "Server Error" });
  }
};

//@route    GET api/auth
//@desc     logged a user
//@access   Private
exports.loggedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).json({ msg: "Server Error" });
  }
};
