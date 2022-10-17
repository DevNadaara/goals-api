const { User } = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");

const login = async (req, res) => {
  let user;

  user = await User.findOne(
    req.body.email ? { email: req.body.email } : { username: req.body.username }
  );

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
