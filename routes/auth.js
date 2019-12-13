const express = require("express");
const { auth, checkValid } = require("../middlewares/validator");
const { authenticate } = require("../controllers/auth");
const { authMdw } = require("../middlewares/auth");
const { loggedUser } = require("../controllers/auth");

const router = express.Router();

router.get("/", authMdw, loggedUser);

router.post("/", auth, checkValid, authenticate);

module.exports = router;
