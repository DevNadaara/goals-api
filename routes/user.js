const { validate } = require("../models/userModel");
const {
  register,
  setUpdate,
  getUsers,
  getMe,
} = require("../controllers/userController");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isadmin");
const validateObjectID = require("../middleware/validateObjectID");
const express = require("express");
const router = express.Router();

router.get("/me", auth, getMe);
router.get("/", [auth, isAdmin], getUsers);
router.post("/", validator(validate), register);
router.put("/:id", [validateObjectID, auth], setUpdate);

module.exports = router;
