const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection_url = process.env.LOCAL_DB_CONNECT;

    if (!connection_url) {
      throw new Error("LOCAL_DB_CONNECT is not defined in .env");
    }

    await mongoose.connect(connection_url);

    console.log("✅ MongoDB connected (localhost)");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
