const express = require("express");
const connectDB = require("./start/config");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

app.listen(PORT, () => console.log("server connected on port " + PORT));
