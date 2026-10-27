const mongoose = require("mongoose");

const NextofKinchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    address: {
      type: String,
    },
    telephone: {
      type: String,
    },
    occupation: {
      type: String,
    },
    relationship: {
      String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nextofkins", NextofKinchema);
