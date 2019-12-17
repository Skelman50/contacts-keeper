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
  res.json(contact);
});

//@route    PUT api/contacts/:id
//@desc     add a new contact
//@access   Private
exports.updateContact = asyncHandler(async (req, res, next) => {
  const contactFields = { ...req.body };
  let contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(new ErrorResponse("contact not found", 404));
  }
  if (contact.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized", 401));
  }
  contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { $set: contactFields },
    { new: true }
  );
  res.json(contact);
});

//@route    DELETE api/contacts/:id
//@desc     delete contact
//@access   Private
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(new ErrorResponse("Contact not found", 404));
  }
  if (contact.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized", 401));
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
