const express = require("express");
const { authMdw } = require("../middlewares/auth");
const { getAllContacts } = require("../controllers/contacts");

const router = express.Router();

//@route    GET api/contacts
//@desc     get all user's contacts
//@access   Private
router.get("/", authMdw, getAllContacts);

//@route    POST api/contacts
//@desc     add a new contact
//@access   Private
router.post("/", (req, res) => {
  res.send("Add a new contacy");
});

//@route    PUT api/contacts/:id
//@desc     add a new contact
//@access   Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

//@route    DELETE api/contacts/:id
//@desc     delete contact
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
