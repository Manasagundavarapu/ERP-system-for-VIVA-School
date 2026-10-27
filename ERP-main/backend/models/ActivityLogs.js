const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    action: String,
    user: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLogs", ActivitySchema);
