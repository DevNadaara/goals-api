const { validate } = require("../models/userModel");
const { register } = require("../controllers/userController");
const validator = require("../middleware/validate");
const express = require("express");
const router = express.Router();

router.post("/", validator(validate), register);

module.exports = router;
