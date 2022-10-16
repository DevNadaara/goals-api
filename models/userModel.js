const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivate"),
    { expiresIn: "10d" }
  );

  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    username: Joi.string().max(20).min(3).required(),
    email: Joi.string().email().max(20).min(5).required(),
    password: Joi.string().max(20).min(5).required(),
  });

  return schema.validate(user);
};

module.exports.validate = validate;
module.exports.User = User;
