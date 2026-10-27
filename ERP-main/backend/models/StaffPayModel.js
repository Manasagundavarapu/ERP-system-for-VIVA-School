const mongoose = require("mongoose");

const BankingSchema = new mongoose.Schema(
  {
    useID: {
      type: String,
      required: true,
    },
    basicSalary: {
      type: String,
    },
    bank: {
      type: String,
    },
    employeeSSF: {
      type: String,
    },
    transactions: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now,
          },
          allowance: String,
          grossIncome: String,
          deductions: String,
          tax: String,
          netSalary: String,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("staffpay", BankingSchema);
