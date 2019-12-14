const express = require("express");
const { authMdw } = require("../middlewares/auth");
const {
  getAllContacts,
  addNewContact,
  updateContact,
  deleteContact
} = require("../controllers/contacts");
const { addNewContactCheck, checkValid } = require("../middlewares/validator");

const router = express.Router();

router.get("/", authMdw, getAllContacts);

router.post("/", addNewContactCheck, checkValid, authMdw, addNewContact);

router.put("/:id", authMdw, updateContact);

router.delete("/:id", authMdw, deleteContact);

module.exports = router;
