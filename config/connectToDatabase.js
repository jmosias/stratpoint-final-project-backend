const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
