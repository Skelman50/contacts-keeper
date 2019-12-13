const Contact = require("../models/Contacts");
const User = require("../models/Users");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).json({ msg: "Server Error" });
  }
};
