const mongoose = require("mongoose");

const NonBillSchema = new mongoose.Schema(
  {
    student: {
      type: String,
    },
    term: {
      type: String,
    },
    year: {
      type: String,
    },
    amount: {
      type: String,
    },
    remarks: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    bank: {
      type: String,
    },
    cheque: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nonbillpayment", NonBillSchema);
