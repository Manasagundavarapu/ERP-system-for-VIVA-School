const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    sender: {
      type: String,
    },
    isSend: {
      type: Boolean,
      default: false,
    },
    messageID: {
      type: String,
    },
    receiver: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("newMessage", NotificationsSchema);
