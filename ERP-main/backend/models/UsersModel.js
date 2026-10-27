const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    lastlogin: {
      type: Date,
    },
    restrictions: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UsersSchema);
