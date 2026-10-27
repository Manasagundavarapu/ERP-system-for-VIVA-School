const mongoose = require("mongoose");

const YearGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("yeargroup", YearGroupSchema);
