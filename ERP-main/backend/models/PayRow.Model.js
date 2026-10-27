const mongoose = require("mongoose");

const PayrowSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "pay",
    },
    name: String,
    code: String,
    salary: String,
    allowance: String,
    bonus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("payrow", PayrowSchema);
