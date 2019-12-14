const express = require("express");
const { authMdw } = require("../middlewares/auth");
const { getAllContacts, addNewContact } = require("../controllers/contacts");
const { addNewContactCheck, checkValid } = require("../middlewares/validator");

const router = express.Router();

router.get("/", authMdw, getAllContacts);

router.post("/", addNewContactCheck, checkValid, authMdw, addNewContact);

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
