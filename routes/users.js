const express = require("express");
const { register, checkValid } = require("../middlewares/validator");
const { registerUser } = require("../controllers/users");

const router = express.Router();

router.post("/", register, checkValid, registerUser);

module.exports = router;
