const mongoose = require("mongoose");

module.exports = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message || error);
    throw error;
  }
};
