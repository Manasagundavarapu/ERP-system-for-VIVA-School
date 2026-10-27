const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    courseID: {
      type: String,
    },
    classID: {
      type: String,
    },
    senderID: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notes", FilesSchema);
