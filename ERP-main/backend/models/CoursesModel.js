const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    credits: {
      type: Number,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", CourseSchema);
