const express = require("express");
const { connectDB } = require("./config/db");
require("colors");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json({ extended: false }));

//Define routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const listenServer = () => {
  console.log(`server listen port ${PORT}`.blue);
};

async function initApp() {
  await connectDB();
  app.listen(PORT, listenServer);
}

initApp();
