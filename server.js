const express = require("express");
const { errorHandler } = require("./middlewares/error-handler");
const { connectDB } = require("./config/db");
require("colors");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json({ extended: false }));

//Define routes

const listenServer = () => {
  console.log(`server listen port ${PORT}`.blue);
};

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.use(errorHandler);

async function initApp() {
  await connectDB();
  app.listen(PORT, listenServer);
}

initApp();
