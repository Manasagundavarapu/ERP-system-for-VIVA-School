const mongoose = require("mongoose");

const StoreSalesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    totalCost: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    seller: {
      type: String,
    },
    items: {
      type: [
        {
          name: {
            type: String,
          },
          qty: {
            type: Number,
          },
          rate: {
            type: Number,
          },
          amount: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("storesales", StoreSalesSchema);
