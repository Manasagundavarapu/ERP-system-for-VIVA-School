const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    teacherID: String,
    courseID: String,
    classID: String,
    score: String,
    taskData: String,
    date: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", TaskSchema);
