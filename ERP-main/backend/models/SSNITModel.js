const mongoose = require("mongoose");

const SBASchema = new mongoose.Schema(
  {
    year: {
      type: String,
    },
    month: {
      type: String,
    },
    percentage: {
      type: Number,
    },
    teachers: {
      type: [
        {
          userID: String,
          name: String,
          SSNITNumber: String,
          position: String,
          salary: Number,
          contribution: Number,
          grade: String,
          interpretation: String,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ssnit", SBASchema);
