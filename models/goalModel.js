const Joi = require("joi");

const mongoose = require("mongoose");

const goalsSchema = new mongoose.Schema(
  {
    user: {
      type: new mongoose.Schema({
        username: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 20,
        },
        email: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255,
        },
      }),
    },
    text: {
      type: String,
      minlength: 10,
      max: 255,
      required: true,
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalsSchema);

const validate = (goals) => {
  const schema = Joi.object({
    text: Joi.string().min(10).required(),
    userId: Joi.objectId().required(),
  });

  return schema.validate(goals);
};

module.exports = {
  validate,
  Goal,
};
