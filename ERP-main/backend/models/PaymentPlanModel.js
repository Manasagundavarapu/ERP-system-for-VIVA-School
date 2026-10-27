const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    plans: {
      type: [
        {
          name: String,
          plan: String,
          description: String,
          price: String,
        },
      ],
    },
    services: {
      type: [
        {
          name: String,
          plan1: String,
          plan2: String,
          plan3: String,
        },
      ],
    },
    dataID: {
      type: String,
      default: "paymentPlan",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("canteenpayplan", PaymentSchema);
