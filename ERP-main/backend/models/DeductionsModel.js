const mongoose = require("mongoose");

const DeductionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: String,
    },
    staff: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("deductions", DeductionsSchema);
