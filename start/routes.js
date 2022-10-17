const users = require("../routes/user");
const auth = require("../routes/auth");
const goals = require("../routes/goal");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/goals", goals);
  app.use(error);
};
