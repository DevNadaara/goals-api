const { User } = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");

const register = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(401).send("email already registered");

  user = await User.findOne({ username: req.body.username });
  if (user) return res.status(401).send("username already registered");

  // hashed password
  const salt = await bcryptjs.genSalt(10);
  const hashed = await bcryptjs.hash(req.body.password, salt);

  user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashed,
  });
  const token = user.generateToken();

  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
};

const setUpdate = async (req, res) => {
  //check is users are same
  if (req.user._id !== req.params.id)
    return res.status(403).send(" access not allowed");

  // hashed password
  const salt = await bcryptjs.genSalt(10);
  const hashed = await bcryptjs.hash(req.body.password, salt);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    },
    { new: true }
  );
  if (!user) return res.status(404).send("user isnt found");
};

const getUsers = async (req, res) => {
  const user = await User.find();
  res.send(user);
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.send(user);
};

module.exports = {
  register,
  setUpdate,
  getUsers,
  getMe,
};
