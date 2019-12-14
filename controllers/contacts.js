const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/error-response");
const Contact = require("../models/Contacts");
const User = require("../models/Users");

//@route    GET api/contacts
//@desc     get all user's contacts
//@access   Private
exports.getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user.id }).sort({
    date: -1
  });
  res.json(contacts);
});

//@route    POST api/contacts
//@desc     add a new contact
//@access   Private
exports.addNewContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone, type } = req.body;
  const { id: user } = req.user;
  const newContact = new Contact({ name, email, phone, type, user });
  const contact = await newContact.save();
  res.json({ contact });
});
