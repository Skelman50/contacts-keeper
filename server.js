const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

//Define routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const listenServer = () => {
  console.log(`server listen port ${PORT}`);
};

app.listen(PORT, listenServer);
