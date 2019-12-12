const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const config = require("config");

const jwtSecret = config.get("jwtSecret");

//@route    POST api/users
//@desc     register a user
//@access   Public
exports.registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send("Server error");
  }
};
