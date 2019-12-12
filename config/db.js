const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

exports.connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("db start".blue);
  } catch (error) {
    console.log("Init DB error".red, error.message.yellow);
    process.exit(1);
  }
};
