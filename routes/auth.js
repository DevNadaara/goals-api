// const { validate } = require("../models/userModel");
const { login } = require("../controllers/authController");
const validator = require("../middleware/validate");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", validator(validate), login);

module.exports = router;

function validate(user) {
  const schema = Joi.object({
    username: Joi.string().max(20).min(3).required(),
    email: Joi.string().email().max(20).min(5).required(),
    password: Joi.string().max(20).min(5).required(),
  });

  return schema.validate(user);
}
