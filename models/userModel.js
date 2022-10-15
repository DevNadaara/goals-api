const mongoose = require("mongoose");
const Joi = require("joi");
const { required } = require("joi");

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
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
});

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
module.exports.UserModel = User;
