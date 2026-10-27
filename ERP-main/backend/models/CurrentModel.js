const mongoose = require("mongoose");

const AcademicYearSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcademicYear", AcademicYearSchema);
