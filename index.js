const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
require("express-async-errors");
const connectDB = require("./start/config");
const users = require("./routes/user");
const auth = require("./routes/auth");
const goals = require("./routes/goal");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/goals", goals);

const PORT = 5000;

app.listen(PORT, () => console.log("server connected on port " + PORT));
