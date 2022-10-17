const {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
} = require("../controllers/goalController");
const { validate } = require("../models/goalModel");
const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const validateObjectID = require("../middleware/validateObjectID");
const express = require("express");

const router = express.Router();

router.get("/", auth, getGoal);
router.post("/", [validator(validate), auth], createGoal);
router.put("/:id", [auth, validateObjectID, validator(validate)], updateGoal);
router.delete(
  "/:id",
  [auth, validateObjectID, validator(validate)],
  deleteGoal
);

module.exports = router;
