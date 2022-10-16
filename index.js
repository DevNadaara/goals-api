const express = require("express");
require("express-async-errors");
const connectDB = require("./start/config");
const users = require("./routes/user");
const auth = require("./routes/auth");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = 5000;

app.listen(PORT, () => console.log("server connected on port " + PORT));
