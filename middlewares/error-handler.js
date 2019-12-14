const Errorresponse = require("../utils/error-response");

exports.errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    err = new Errorresponse("Resource not found", 404);
  }

  if (err.code === 11000) {
    err = new Errorresponse("Duplicate field", 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors);
    err = new Errorresponse(message, 400);
  }
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || "Server error" });
};
