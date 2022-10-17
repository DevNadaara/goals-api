const { Goal } = require("../models/goalModel");
const { User } = require("../models/userModel");

const createGoal = async (req, res) => {
  const user = await User.findById(req.body.userId);

  if (!user) return res.status(401).send("invalid user");

  const goal = await Goal.create({
    text: req.body.text,
    user: {
      username: user.username,
      email: user.email,
    },
  });

  res.send(goal);
};

const updateGoal = async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
    },
    { new: true }
  );

  if (!goal) return res.status(401).send("sorry cant update invalid goal");

  res.send(goal);
};

const deleteGoal = async (req, res) => {
  const goal = await Goal.findByIdAndRemove(req.params.id);

  if (!goal) return res.status(401).send("invalid goal");

  res.send(goal);
};

const getGoal = async (req, res) => {
  const goal = await Goal.find({});
  res.send(goal);
};

module.exports = {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
};
