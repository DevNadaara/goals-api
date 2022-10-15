const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.get("db"));

    console.log(`connected MongoDB on goals db`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
