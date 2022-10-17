// const { validate } = require("../models/userModel");
const { login } = require("../controllers/authController");
const validator = require("../middleware/validate");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", validator(validate), login);

module.exports = router;

//user inputs validation

function validate(user) {
  const schema = Joi.object({
    username: Joi.string().max(20).min(3),
    email: Joi.string().email().max(20).min(5),
    password: Joi.string().max(20).min(5).required(),
  }).xor("username", "email");

  return schema.validate(user);
}
