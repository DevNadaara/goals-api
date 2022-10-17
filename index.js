const express = require("express");
require("express-async-errors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./start/config")();
require("./start/validation")();
require("./start/routes")(app);

const PORT = 5000;

app.listen(PORT, () => console.log("server connected on port " + PORT));
