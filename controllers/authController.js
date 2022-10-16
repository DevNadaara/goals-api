const { User } = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");

const login = async (req, res) => {
  let user;
  if (req.body.email) {
    user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("invalid email or password");
  }

  if (req.body.username) {
    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(401).send("invalid username or password");
  }
  const validPassword = await bcryptjs.compare(
    req.body.password,
    user.password
  );

  if (!validPassword)
    return res.status(401).send("invalid username or password");

  const token = user.generateToken();

  res.send(token);
};

module.exports = {
  login,
};
